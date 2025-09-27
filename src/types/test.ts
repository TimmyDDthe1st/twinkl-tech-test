export interface ValidationFailureCase {
  description: string;
  userData: {
    fullName?: string;
    email?: string;
    password?: string;
    createdDate?: string;
    userType?: string;
  };
  expectedFields: string[];
}