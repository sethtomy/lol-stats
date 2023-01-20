import { ParticipantDto } from '@sethtomy/riot-proxy-client';

export default class AbstractReportService {
  protected static getTotalGames(participantDtos: ParticipantDto[]): number {
    return participantDtos.length;
  }

  protected static getTotalWins(participantDtos: ParticipantDto[]): number {
    let wins = 0;
    participantDtos.forEach((participantDto) => {
      if (participantDto.win) {
        wins++;
      }
    });
    return wins;
  }
}
