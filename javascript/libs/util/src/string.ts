import { UserReportDto } from '@sethtomy/report-client';

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function addLy(str: string): string {
  if (str.toLowerCase() === 'day') {
    str = str.replace('y', 'i');
  }
  return str + 'ly';
}

export function leagueToString(
  userReport: UserReportDto,
  league: 'highestFlexLeague' | 'highestSoloDuoLeague',
) {
  const currentLeague = userReport[league];
  if (!currentLeague) {
    return 'UNRANKED';
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return `${currentLeague?.tier} ${currentLeague?.rank} ${currentLeague?.leaguePoints}`;
}
