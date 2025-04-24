import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', length: 100 })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  fullName: string;

  @Column({ length: 12 })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string;

  @Column('jsonb')
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: any;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
