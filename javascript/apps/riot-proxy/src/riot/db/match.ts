import { Entity } from 'typeorm';
import { MatchDto } from '../../match/dto/match.dto';
import { AbstractKeyValueEntity } from '../../db/kev-value.entity';

@Entity()
export class Match extends AbstractKeyValueEntity<MatchDto> {}
