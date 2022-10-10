import { RiotAPITypes } from '@fightmegg/riot-api';
import MetadataDTO = RiotAPITypes.MatchV5.MetadataDTO;

export class MetadataDto implements MetadataDTO {
  dataVersion: string;
  matchId: string;
  participants: string[];

  constructor(opts: MetadataDTO) {
    Object.assign(this, opts);
  }
}
