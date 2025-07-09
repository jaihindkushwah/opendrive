import { openSqliteDb } from "@/lib/db";

export class CarRepository {
  private database: any;
  private constructor(database: any) {
    this.database = database;
  }
  static async init() {
    const db = await openSqliteDb();
    return new CarRepository(db);
  }
  async getCars() {
    const data = await this.database.all(`SELECT * FROM CAR`);
    return data;
  }

}
// export const carRepository = CarRepository.init();
