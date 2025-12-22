import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBirthdayDto } from './dto/create-birthday.dto';
import { Birthday } from './entities/birthday.entity';

@Injectable()
export class BirthdayService {
  constructor(
    @InjectRepository(Birthday)
    private readonly birthdayRepository: Repository<Birthday>,
  ) {}

  async createBirthday(dto: CreateBirthdayDto) {
    const record = this.birthdayRepository.create({
      name: dto.name.trim(),
      birthdate: dto.birthdate,
    });

    const saved = await this.birthdayRepository.save(record);
    const { daysUntilBirthday } = this.getDaysUntilBirthday(saved.birthdate);

    return {
      ...saved,
      daysUntilBirthday,
    };
  }

  async listBirthdays() {
    const birthdays = await this.birthdayRepository.find({
      order: { id: 'ASC' },
    });

    return birthdays.map((b) => ({
      ...b,
      daysUntilBirthday: this.getDaysUntilBirthday(b.birthdate).daysUntilBirthday,
    }));
  }

  getDaysUntilBirthday(birthdate: string) {
    if (!birthdate) {
      throw new BadRequestException('birthdate is required');
    }

    const today = new Date();
    const birth = new Date(birthdate);

    if (isNaN(birth.getTime())) {
      throw new BadRequestException('invalid date format');
    }

    const nextBirthday = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate(),
    );

    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diffMs = nextBirthday.getTime() - today.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return {
      daysUntilBirthday: days,
    };
  }
}
