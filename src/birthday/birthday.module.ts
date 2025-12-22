import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BirthdayController } from './birthday.controller';
import { BirthdayService } from './birthday.service';
import { Birthday } from './entities/birthday.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Birthday])],
  controllers: [BirthdayController],
  providers: [BirthdayService],
})
export class BirthdayModule {}
