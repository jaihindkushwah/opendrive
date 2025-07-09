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

export interface CarListing extends CarListingInput {
  id: number;
  user_id: number;
  status: "pending" | "approved" | "rejected" | null;
  created_at: string;
  updated_at: string;
  submittedBy?: string;
}
export interface CarListingInput {
  title: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  price_per_day: number;
  location: string;
}

export type CarListingUpdateInput = Partial<CarListing>;