import { LeagueDto } from '@sethtomy/riot-proxy-client';

export const QueueType = Object.freeze({
  SOLO_DUO: 'RANKED_SOLO_5x5',
  FLEX: 'RANKED_FLEX_SR',
});

export const Tier = Object.freeze({
  BRONZE: 'BRONZE',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM',
  DIAMOND: 'DIAMOND',
  MASTER: 'MASTER',
  GRANDMASTER: 'GRANDMASTER',
});

export const TierRankOrder = [
  Tier.BRONZE,
  Tier.SILVER,
  Tier.GOLD,
  Tier.PLATINUM,
  Tier.DIAMOND,
  Tier.GRANDMASTER,
];

export const Rank = Object.freeze({
  I: 'I',
  II: 'II',
  III: 'III',
  IV: 'IV',
});

export const RankOrder = [Rank.IV, Rank.III, Rank.II, Rank.I];

export function compareRanks(leagueDtos: LeagueDto[]): LeagueDto | undefined {
  if (leagueDtos.length === 0) {
    return;
  }
  return leagueDtos.reduce((a, b) => {
    const aTier = TierRankOrder.indexOf(a.tier);
    const bTier = TierRankOrder.indexOf(b.tier);
    if (aTier !== bTier) {
      if (aTier > bTier) {
        return a;
      }
      return b;
    }

    const aRank = RankOrder.indexOf(a.rank);
    const bRank = RankOrder.indexOf(b.rank);
    if (aRank !== bRank) {
      if (aRank > bRank) {
        return a;
      }
      return b;
    }

    if (a.leaguePoints > b.leaguePoints) {
      return a;
    }
    return b;
  });
}
