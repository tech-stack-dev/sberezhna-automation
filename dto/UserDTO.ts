export class UserDTO {
  public name: string;
  public yearOfBirth: number;
  public gender: number;

  constructor(name: string, yearOfBirth: number, gender: number) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.gender = gender;
  }
}