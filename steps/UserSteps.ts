import { APIRequestContext, APIResponse } from '@playwright/test';
import { UserDTO } from '../dto/UserDTO';

export class UserSteps {
  createdUser?: UserDTO;

  async createUser(apiContext: APIRequestContext, user: UserDTO): Promise<APIResponse> {
    this.createdUser = user;

    const response = await apiContext.post('User', {
      data: user,
    });

    return response;
  }

  async deleteUser(apiContext: APIRequestContext, id: number) {
    const response = await apiContext.delete(`User/${id}`);
    return response;
  }
}