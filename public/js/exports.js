import xlsx from "xlsx";
import mysql from 'mysql2';
import dotenv from "dotenv";
dotenv.config();


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
    console.log('DB_HOSTER:', process.env.DB_HOSTER);
    console.log('DB_USERMAN:', process.env.DB_USERMAN);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
    return mysql.createPool({
        host: process.env.DB_HOSTER,
        user: process.env.DB_USERMAN,
        password: process.env.DB_PASSWORD,
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





