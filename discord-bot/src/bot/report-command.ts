import { Command, DiscordCommand } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { Injectable } from '@nestjs/common';

@Command({
  name: 'ls',
  description: 'Get report for current user',
})
@Injectable()
export class ReportCommand implements DiscordCommand {
  handler(interaction: CommandInteraction): string {
    return 'List with music...';
  }
}
