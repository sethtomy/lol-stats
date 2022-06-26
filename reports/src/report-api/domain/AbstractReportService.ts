import { RiotAPITypes } from '@fightmegg/riot-api';

export default class AbstractReportService {
  protected static getTotalGames(
    participantDtos: RiotAPITypes.MatchV5.ParticipantDTO[],
  ): number {
    return participantDtos.length;
  }

  protected static getTotalWins(
    participantDtos: RiotAPITypes.MatchV5.ParticipantDTO[],
  ): number {
    let wins = 0;
    participantDtos.forEach((participantDto) => {
      if (participantDto.win) {
        wins++;
      }
    });
    return wins;
  }
}
