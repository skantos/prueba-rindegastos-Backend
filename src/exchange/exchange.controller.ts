import { Controller, Get, Query } from '@nestjs/common';
import { ConvertAmountDto } from './dto/convert-amount.dto';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('getConvertedAmount')
  getConvertedAmount(@Query() query: ConvertAmountDto) {
    return this.exchangeService.convertAmount(query);
  }
}

