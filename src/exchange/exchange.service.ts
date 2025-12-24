import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ConvertAmountDto } from './dto/convert-amount.dto';

@Injectable()
export class ExchangeService {
  private readonly appId: string | undefined;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.appId = this.configService.get<string>('OPEN_EXCHANGE_APP_ID');
  }

  async convertAmount(dto: ConvertAmountDto) {
    const from = dto.from.toUpperCase();
    const to = dto.to.toUpperCase();
    const date = dto.date;
    const endpoint = date
      ? `https://openexchangerates.org/api/historical/${date}.json`
      : 'https://openexchangerates.org/api/latest.json';

    try {
      const response = await axios.get(endpoint, {
        params: { app_id: this.appId, symbols: `${from},${to}` },
        timeout: 8000,
      });

      const rates = response.data?.rates ?? {};
      if (!rates[from] || !rates[to]) {
        throw new BadRequestException(
          'Alguna de las monedas no está soportada por la API',
        );
      }

      const rate = rates[to] / rates[from];
      const convertedAmount = Number((dto.amount * rate).toFixed(4));
      const resolvedDate =
        date ??
        new Date((response.data?.timestamp ?? Date.now() / 1000) * 1000)
          .toISOString()
          .split('T')[0];

      return {
        from,
        to,
        originalAmount: dto.amount,
        convertedAmount,
        rate: Number(rate.toFixed(6)),
        date: resolvedDate,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new ServiceUnavailableException(
        'No se pudo obtener la tasa de cambio',
      );
    }
  }
}

