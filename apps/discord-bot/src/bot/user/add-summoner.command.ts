import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  UsePipes,
} from '@discord-nestjs/core';
import { User as DiscordUser } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { TransformPipe } from '@discord-nestjs/common';
import { TransformedCommandExecutionContext } from '@discord-nestjs/core/dist/definitions/interfaces/transformed-command-execution-context';
import { UserConfigService } from '@sethtomy/config';
import { HttpClientService } from '@sethtomy/http-client';
import { CreateSummonerDto } from '@sethtomy/user-client';
import { SummonerDto } from './summoner.dto';
import { sendUserMessageEmbed } from './user-message-embed';
import { DEFAULT_MESSAGE } from '../common/message';
import { AbstractUserCommand } from '../common/abstract-user-command';
import { sendErrorMessageEmbed } from '../common/message-embed';

@SubCommand({
  name: 'add-summoner',
  description: 'Add a Summoner to your account.',
})
@Injectable()
@UsePipes(TransformPipe)
export class AddSummonerCommand
  extends AbstractUserCommand
  implements DiscordTransformedCommand<SummonerDto>
{
  constructor(
    userConfigService: UserConfigService,
    httpClientService: HttpClientService,
  ) {
    super(userConfigService, httpClientService);
  }

  handler(
    @Payload() dto: SummonerDto,
    executionContext: TransformedCommandExecutionContext,
  ): string {
    this.runInBackground(dto, executionContext);
    return DEFAULT_MESSAGE;
  }

  private async runInBackground(
    @Payload() dto: SummonerDto,
    executionContext: TransformedCommandExecutionContext,
  ): Promise<void> {
    const discordUser = executionContext.interaction.member.user as DiscordUser;
    const user = await this.createUserIfDoesNotExist(discordUser.id);
    const summonerExists = await this.createSummonerIfDoesNotExist(
      discordUser.id,
      dto.summoner,
    );
    console.log(summonerExists);
    if (summonerExists) {
      sendUserMessageEmbed(
        executionContext.interaction,
        discordUser,
        this.getSummoners(user.summonerNames, dto.summoner),
      );
    } else {
      sendErrorMessageEmbed(
        executionContext.interaction,
        `Summoner "${dto.summoner}" does not exist.`,
      );
    }
  }

  private getSummoners(previous: string[], now: string): string[] {
    const set = new Set(previous);
    set.add(now);
    return Array.from(set);
  }

  private async createSummonerIfDoesNotExist(
    discordUserId: string,
    summoner: string,
  ): Promise<boolean> {
    const createSummonerDto: CreateSummonerDto = {
      name: summoner,
    };
    const res = await this.summonerApi.summonerControllerCreate(
      discordUserId,
      createSummonerDto,
      {
        validateStatus: (status) =>
          status === 201 || status === 409 || status === 404,
      },
    );
    return res.status !== 404;
  }
}
