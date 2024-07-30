import xlsx from "xlsx";
import mysql from 'mysql2';
import configDotenv from "dotenv";
configDotenv.config();


export function getNamesFromFile(file){
    let w=xlsx.readFile(file);
    let s=w.Sheets[w.SheetNames[0]];
    let names={};
    for (let index = 2; index <5; index++) {
    
        const first=s["B"+index].v;
        const second=s["A"+index].v;
        names[second]=first;
    }
    return names;
}

export function pool(db) {
    return mysql.createPool({
        host: processMultipart.env.DB_HOST,
        user: process.ev.DB_ROOT,
        password: processMultipart.env.DB_PASSWORD,
        database: db
    }).promise();
}

export async function sql(query, db, values = []) {
    const p = pool(db);
    try {
        await p.query(query, values);
        console.log("Query executed successfully.");
    } catch (err) {
        console.error("Error executing query:", err);
    } finally {
        await p.end(); 
    }
}





