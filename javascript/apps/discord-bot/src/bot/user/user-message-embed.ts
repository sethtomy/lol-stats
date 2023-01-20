import {
  getSuccessMessageEmbed,
  sendMessageEmbedViaInteraction,
} from '../common/message-embed';
import { CommandInteraction, EmbedBuilder, User } from 'discord.js';

function getUserMessageEmbed(
  user: User,
  summonerNames: string[],
): EmbedBuilder {
  return getSuccessMessageEmbed()
    .setTitle('User Data')
    .addFields({ name: 'User Name', value: user.username })
    .addFields(
      summonerNames.map((summoner, idx) => {
        return { name: `Summoner ${idx + 1}`, value: summoner };
      }),
    );
}

export function sendUserMessageEmbed(
  interaction: CommandInteraction,
  user: User,
  summonerNames: string[],
): void {
  const messageEmbed = getUserMessageEmbed(user, summonerNames);
  sendMessageEmbedViaInteraction(interaction, messageEmbed);
}
