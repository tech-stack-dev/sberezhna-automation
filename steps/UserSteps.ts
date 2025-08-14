import { APIRequestContext } from '@playwright/test';
import { UserDTO } from '../dto/UserDTO';

export class UserSteps {
  createdUser!: UserDTO;

  async createUser(apiContext: APIRequestContext, name: string, yearOfBirth: number, gender: number) {
    this.createdUser = new UserDTO(name, yearOfBirth, gender);

    const response = await apiContext.post('User', {
      data: this.createdUser
    });

    return response;
  }

  async deleteUser(apiContext: APIRequestContext, id: number) {
    const response = await apiContext.delete(`User/${id}`);
    return response;
  }
}