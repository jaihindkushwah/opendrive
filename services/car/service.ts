import { CarListingUpdateInput } from "@/types";
import axios, { AxiosInstance } from "axios";

const baseApi = process.env.NEXT_PUBLIC_API_URL ||"http://localhost:3000";
export class CarListingService {
  private axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: baseApi,
    });
  }
  async getCars(params: string) {
    return this.axios.get(`/api/cars?${params}`);
  }
  async getCarById(id: string) {
    return this.axios.get(`/api/cars/${id}`);
  }
  async updateCarListingById(id: string, data: CarListingUpdateInput) {
    return this.axios.put(`/api/cars/${id}`, data);
  }
  async updateCarListingStatusById(id: string, status: string) {
    return this.axios.patch(`/api/cars/${id}`, { status });
  }
  async addCar(data: CarListingUpdateInput) {
    return this.axios.post("/api/cars", data);
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

export const carService = new CarListingService();
