import { RiotAPITypes } from '@fightmegg/riot-api';
import MatchInfoDTO = RiotAPITypes.MatchV5.MatchInfoDTO;
import TeamDTO = RiotAPITypes.MatchV5.TeamDTO;
import { ParticipantDto } from './participant.dto';

export class MatchInfoDto implements MatchInfoDTO {
  gameCreation: number;
  gameDuration: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: ParticipantDto[];
  platformId: string;
  queueId: number;
  teams: TeamDTO[];
  tournamentCode: string;

  constructor(opts: MatchInfoDTO) {
    Object.assign(this, opts);
  }
}
