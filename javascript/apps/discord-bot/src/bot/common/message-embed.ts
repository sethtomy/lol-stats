import { CacheTypeReducer, CommandInteraction, EmbedBuilder } from 'discord.js';

export function getSuccessMessageEmbed(): EmbedBuilder {
  return new EmbedBuilder().setColor('#00FF00');
}

export function getErrorMessageEmbed(): EmbedBuilder {
  return new EmbedBuilder().setColor('#FF0000').setTitle('Error');
}

export function sendErrorMessageEmbed(
  interaction: CommandInteraction,
  description: string,
): void {
  const messageEmbed = getErrorMessageEmbed().setDescription(description);
  sendMessageEmbedViaInteraction(interaction, messageEmbed);
}

export function sendMessageEmbed(
  channel: CacheTypeReducer<any, any>,
  messageEmbed: EmbedBuilder,
) {
  channel.send({ embeds: [messageEmbed] });
}

export function sendMessageEmbedViaInteraction(
  interaction: CommandInteraction,
  messageEmbed: EmbedBuilder,
): void {
  interaction.channel.send({ embeds: [messageEmbed] });
}
