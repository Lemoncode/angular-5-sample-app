export class Game {
  name: string;
  dateRelease: Date;
  imageUrl?: string;

  constructor(name?: string, dateRelease?: string, imageUrl?: string) {
    this.name = name;
    this.dateRelease = new Date(dateRelease);
    this.imageUrl = imageUrl;
  }

  getYearsFromRelease(): number {
    return 0;
  }

  private getMillisecondsDiff = (milliseconds: number): number => Date.now() - milliseconds;
  private convertToYears = (releaseDate: Date): number => Math.abs(releaseDate.getUTCFullYear() - 1970);
}
