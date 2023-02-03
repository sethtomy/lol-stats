import { Column, Entity } from 'typeorm';

@Entity()
export abstract class AbstractKeyValueEntity<T> {
  @Column({ nullable: false, primary: true })
  id: string;

  @Column({ type: 'json' })
  data: T;
}
