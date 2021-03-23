export class User {
  public constructor(
    public username: string,
    public password: string,
    public firstName?: string,
    public lastName?: string,
    public id?: number,
  ) {}
}
