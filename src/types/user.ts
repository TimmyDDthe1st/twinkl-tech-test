export type UserType = "student" | "teacher" | "parent" | "private tutor";

export interface User {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  createdDate: string;
  userType: UserType;
}

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  createdDate?: string;
  userType: UserType;
}

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  createdDate: string;
  userType: UserType;
}
