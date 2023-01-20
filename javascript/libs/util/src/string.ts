import { UserReportDto } from '@sethtomy/report-client';

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function addLy(str: string): string {
  return str + 'ly';
}

export function leagueToString(
  userReport: UserReportDto,
  league: 'highestFlexLeague' | 'highestSoloDuoLeague',
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return `${userReport[league]?.tier} ${userReport[league]?.rank} ${userReport[league]?.leaguePoints}`;
}
