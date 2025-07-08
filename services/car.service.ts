import axios, { AxiosInstance } from "axios";

const baseApi = "http://localhost:3000";
export class CarRentalService {
  private axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: baseApi,
    });
  }

  async getCars() {
    return this.axios.get("/api/cars");
  }
  async getCar(id: string) {
    return this.axios.get(`/api/cars/${id}`);
  }
  async addCar(data: any) {
    return this.axios.post("/api/cars", data);
  }
  async updateCar(id: string, data: any) {
    return this.axios.put(`/api/cars/${id}`, data);
  }
  async deleteCar(id: string) {
    return this.axios.delete(`/api/cars/${id}`);
  }
  async rentCar(id: string) {
    return this.axios.post(`/api/cars/${id}/rent`);
  }
  async returnCar(id: string) {
    return this.axios.post(`/api/cars/${id}/return`);
  }
}

export const carService = new CarRentalService();
