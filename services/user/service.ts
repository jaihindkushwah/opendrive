import axios, { AxiosInstance } from "axios";

const baseApi = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export class UserService {
  private axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: baseApi,
    });
  }
  async register(name: string, email: string, password: string) {
    return this.axios.post("/api/user/register", { name, email, password });
  }
  async login(email: string, password: string) {
    return this.axios.post("/api/user/login", { email, password });
  }

  async logout() {
    return this.axios.post("/api/user/logout");
  }

  async getProfile() {
    return this.axios.get("/api/user/me");
  }
}
export const userService = new UserService();