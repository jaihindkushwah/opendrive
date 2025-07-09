import { openSqliteDb } from "@/lib/db";
import { User, UserInput, UserUpdateInput } from "@/types";


export class UserRepository {
  private database: any;

  private constructor(database: any) {
    this.database = database;
  }
  static async init() {
    const db = await openSqliteDb();
    return new UserRepository(db);
  }
  async findUserById(id: string) {}
  async getAllUsers(): Promise<User[]> {
    const data = await this.database.all(`SELECT * FROM USER`);
    return data;
  }
  async findUserByEmail(email: string): Promise<User> {
    const data = await this.database.all(
      `SELECT * FROM USER WHERE email='${email.toLowerCase()}'`
    );
    return data[0];
  }
  async createUser(user: UserInput) {
    const { email, name, password } = user;
    await this.database.all(
      `INSERT INTO USER(name,email,password) VALUES('${name}','${email.toLowerCase()}','${password}')`
    );
  }
  async deleteUserById(id: string) {
    await this.database.all(`DELETE FROM USER WHERE id=${id}`);
  }
  async updateUserByEmail(email: string, user: UserUpdateInput) {
    const updates = Object.entries(user)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}='${value}'`)
      .join(", ");

    if (!updates) {
      throw new Error("No fields to update.");
    }

    const query = `UPDATE USER SET ${updates} WHERE email='${email.toLowerCase()}'`;
    await this.database.all(query);
  }
  async updateUserById(id: string, user: UserUpdateInput) {
    const updates = Object.entries(user)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}='${value}'`)
      .join(", ");

    if (!updates) {
      throw new Error("No fields to update.");
    }

    const query = `UPDATE USER SET ${updates} WHERE id=${id}`;
    await this.database.all(query);
  }
  async updatePasswordByEmail(email: string, password: string) {
    await this.database.all(
      `UPDATE USER SET password='${password}' WHERE email='${email.toLowerCase()}'`
    );
  }
}
// export const userRepository = UserRepository.init();
