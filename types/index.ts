

export interface UserInput {
  name: string;
  email: string;
  password: string;
}
export type User = UserInput & {
  id: string;
  isVerified?: boolean;
  role?: string;
  created_at?: string;
};
export type UserUpdateInput = Partial<User>;



export type UserSessionData = {
  user: {
    id: string;
    email: string;
    role: string;
    token: string;
    name: string;
  };
};
