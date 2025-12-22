import { Controller, Get, Query } from '@nestjs/common';
import { ComputeNumberDto } from './dto/compute-number.dto';
import { NumbersService } from './numbers.service';

@Controller('numbers')
export class NumbersController {
  constructor(private readonly numbersService: NumbersService) {}

  @Get('getTheNumber')
  getTheNumber(@Query() query: ComputeNumberDto) {
    return this.numbersService.getConcatenatedProduct(query);
  }
}


