export interface User {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  createdDate: string;
  userType: "student" | "teacher" | "admin";
}

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  createdDate: string;
  userType: "student" | "teacher" | "admin";
}

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  createdDate: string;
  userType: "student" | "teacher" | "admin";
  // Note: password is intentionally excluded from response
}

export class UserModel {
  // In a real app, this would be a database
  private static users: User[] = [];
  private static nextId = 1;

  static create(userData: CreateUserRequest): UserResponse {
    const newUser: User = {
      id: this.nextId.toString(),
      ...userData,
    };

    this.users.push(newUser);
    this.nextId++;

    // Return user without password
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

  // Method to clear users (useful for testing)
  static clear(): void {
    this.users = [];
    this.nextId = 1;
  }
}
