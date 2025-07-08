import { openSqliteDb } from "@/lib/db"
 async function createDatabases(){
    try {
        const db= await openSqliteDb();
        await db.exec("CREATE DATABASE IF NOT EXITS CAR_RENTAL;");
    } catch (error) {
        console.log(error)
    }
}
createDatabases();