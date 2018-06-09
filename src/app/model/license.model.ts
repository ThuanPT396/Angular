export class License {
  constructor(
    public licenseID: number,
    public price: number,
    public duration: number,
    public name: string,
    public description: string,
    public isActive: number) { }
}