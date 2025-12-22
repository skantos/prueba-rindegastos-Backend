import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateBirthdayDto } from './dto/create-birthday.dto';
import { GetDaysDto } from './dto/get-days.dto';
import { BirthdayService } from './birthday.service';

@Controller('birthday')
export class BirthdayController {

  constructor(
    private readonly birthdayService: BirthdayService,
  ) {}

  @Post()
  createBirthday(@Body() body: CreateBirthdayDto) {
    return this.birthdayService.createBirthday(body);
  }

  @Get()
  listBirthdays() {
    return this.birthdayService.listBirthdays();
  }

  @Get('getDaysUntilMyBirthday')
  getDaysUntilMyBirthday(@Query() query: GetDaysDto) {
    return this.birthdayService.getDaysUntilBirthday(query.birthdate);
  }
}
