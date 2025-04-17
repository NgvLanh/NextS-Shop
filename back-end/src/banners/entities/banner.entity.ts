import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
