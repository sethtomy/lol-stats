import RiotMatchDto from './riot-match.dto';
import { MetadataDto } from './metadata.dto';
import { MatchInfoDto } from './match-info.dto';

export class MatchDto implements RiotMatchDto {
  metadata: MetadataDto;
  info: MatchInfoDto;

  constructor(opts: RiotMatchDto) {
    Object.assign(this, opts);
  }
}
