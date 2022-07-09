export class UserDto {
  discordId: string;
  summoners: string[];

  constructor(id: string, summoners: string[]) {
    this.discordId = id;
    this.summoners = summoners;
  }
}
