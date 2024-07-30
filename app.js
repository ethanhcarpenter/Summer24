import express from 'express';
import path from 'path';
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import { getNamesFromFile,sql } from './public/js/exports.js';


const app = express();
const currentPath = process.cwd();

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{callback(null,path.join(currentPath,"files"))},
    filename:(req,file,callback)=>{
        const filename="class_"+crypto.randomUUID();
        callback(null,filename)
    }
});

const uploadFile=multer({
    storage:storage
})

app.use(cors());
app.use(express.static(path.join(currentPath, 'public')));



app.post("/addClass",uploadFile.any(),(req,res)=>{
    const createTable = `CREATE TABLE \`${req.body.className.toUpperCase()}\` (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        firstname VARCHAR(255),
        lastname VARCHAR(255)
    )`;
    
    
    (async () => {
        try {
            await sql(createTable, "classes");
            const names = getNamesFromFile(path.join("files", req.files[req.files.length - 1].filename));
            for (const key in names) {
                const insertQuery = `INSERT INTO \`${req.body.className.toUpperCase()}\` (firstname, lastname) VALUES (?, ?)`;
                await sql(insertQuery, "classes", [names[key], key]);
            }
            fs.unlink(path.join(currentPath,"files", req.files[req.files.length - 1].filename),(e)=>{})
        } catch (err) {
            console.error("Error:", err);
        }
    })();
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
