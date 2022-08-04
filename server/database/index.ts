const Pool = require('pg').Pool;


export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
    

});
// console.log(process.env.DB_USER, '__________________', process.env.DB_HOST, '__________________', process.env.DB_NAME, '__________________', process.env.DB_PASSWORD, '__________________', process.env.DB_PORT);