import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'birthdays' })
export class Birthday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'date' })
  birthdate: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

