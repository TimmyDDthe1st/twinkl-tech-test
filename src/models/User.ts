import { User, CreateUserRequest, UserResponse } from "../types/user";

export { User, CreateUserRequest, UserResponse };

export class UserModel {
  private static users: User[] = [];
  private static nextId = 1;

  static create(userData: CreateUserRequest): UserResponse {
    const newUser: User = {
      id: this.nextId.toString(),
      ...userData,
      createdDate: userData.createdDate || new Date().toISOString(),
    };

    this.users.push(newUser);
    this.nextId++;

    const { password, ...userResponse } = newUser;
    return userResponse as UserResponse;
  }

  static findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  static findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  static getAll(): UserResponse[] {
    return this.users.map(({ password, ...user }) => user as UserResponse);
  }

  static clear(): void {
    this.users = [];
    this.nextId = 1;
  }
}
