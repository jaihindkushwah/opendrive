import { openSqliteDb } from "@/lib/db";
import { CarListing, CarListingInput, CarListingUpdateInput } from "@/types";

export class CarListingRepository {
  private database: any;
  private constructor(database: any) {
    this.database = database;
  }
  static async init() {
    const db = await openSqliteDb();
    return new CarListingRepository(db);
  }
  async getCars() {
    const data = await this.database.all(`SELECT * FROM CAR_LISTINGS;`);
    return data;
  }
  async getCarById(id: string) {
    const data = await this.database.all(
      `SELECT * FROM CAR_LISTINGS WHERE id=${id};`
    );
    return data[0];
  }
  async getCarsByUserId(userId: string) {
    const data = await this.database.all(
      `SELECT * FROM CAR_LISTINGS WHERE user_id=${userId};`
    );
    return data;
  }
 async getCarListings(page: number, limit: number, status: string = "all", keyword: string = ""):Promise<CarListing[]> {
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  if (status !== "all") {
    conditions.push(`cl.status = '${status}'`);
  }
  if (keyword) {
    const kw = `%${keyword}%`;
    conditions.push(`(
      cl.title LIKE '${kw}' OR
      cl.location LIKE '${kw}' OR
      CAST(cl.price_per_day AS TEXT) LIKE '${kw}' OR
      u.email LIKE '${kw}' OR
      cl.status LIKE '${kw}'
    )`);
  }
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const data = await this.database.all(
    `SELECT cl.*, u.email AS submittedBy
     FROM CAR_LISTINGS cl
     JOIN USER u ON cl.user_id = u.id
     ${whereClause}
     ORDER BY cl.created_at DESC
     LIMIT ${limit} OFFSET ${offset};`
  );

  return data;
}

  async getCarListingsByUserId(userId: string, page: number, limit: number) {
    const offset = (page - 1) * limit;
    const data = await this.database.all(
      `SELECT cl.*, u.email as submittedBy FROM  CAR_LISTINGS cl JOIN USER u ON cl.user_id = u.id WHERE  cl.user_id = ${userId} LIMIT ${limit} OFFSET ${offset};`
    );
    return data;
  }
  async insertCarByUserId(userId: string, data: CarListingInput) {
    const { title, description, brand, model, year, price_per_day, location } =
      data;
    const result = await this.database.run(
      `INSERT INTO CAR_LISTINGS (title,user_id, description, brand, model, year, price_per_day, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [title, userId, description, brand, model, year, price_per_day, location]
    );
    return result;
  }
  async deleteCarById(id: string) {
    const result = await this.database.run(
      `DELETE FROM CAR_LISTINGS WHERE id=${id};`
    );
    return result;
  }
  async updateCar(id: string, data: CarListingUpdateInput) {
    const updates = Object.entries(data)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}='${value}'`)
      .join(", ");
    if (!updates) {
      throw new Error("No fields to update.");
    }
    const result = await this.database.run(
      `UPDATE CAR_LISTINGS SET ${updates} WHERE id=${id};`
    );
    return result;
  }
  async insertManyCarsByUserId(userId: string, data: CarListingUpdateInput[]) {
    const result = await this.database.run(
      `INSERT INTO CAR_LISTINGS (title,user_id, description, brand, model, year, price_per_day, location) VALUES ${data
        .map(
          (item) =>
            `('${item.title}', '${userId}', '${item.description}', '${item.brand}', '${item.model}', '${item.year}', '${item.price_per_day}', '${item.location}')`
        )
        .join(", ")};`
    );
    return result;
  }
}
// export const carRepository = CarRepository.init();
