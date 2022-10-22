import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  discordUserId: string;

  @Column('text', { array: true })
  summonerNames: string[];
}
