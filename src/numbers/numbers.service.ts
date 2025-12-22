import { Injectable } from '@nestjs/common';
import { ComputeNumberDto } from './dto/compute-number.dto';

@Injectable()
export class NumbersService {
  getConcatenatedProduct({ first, second }: ComputeNumberDto) {
    let concatenated = '';

    for (let multiplier = 1; multiplier <= second && concatenated.length < 9; multiplier++) {
      concatenated += String(first * multiplier);
    }

    return {
      first,
      second,
      result: concatenated.slice(0, 9),
    };
  }
}


