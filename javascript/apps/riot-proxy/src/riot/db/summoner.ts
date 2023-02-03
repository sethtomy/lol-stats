import { AbstractKeyValueEntity } from '../../db/kev-value.entity';
import { RiotAPITypes } from '@fightmegg/riot-api';
import { Entity } from 'typeorm';

@Entity()
export class Summoner extends AbstractKeyValueEntity<RiotAPITypes.Summoner.SummonerDTO> {}
