import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  discordUserId: string;

  @Column('text', { array: true })
  summonerNames: string[];
}
