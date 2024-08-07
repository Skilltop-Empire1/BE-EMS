const pg  = require("pg")
const {Pool} = pg;

require("dotenv").config()

console.log(process.env.PG_HOST)

let localConfigPool = {
    user:process.env.PG_USER,
    password:process.env.PG_PASSWORD,
    host:process.env.PG_HOST,
    port:process.env.PG_PORT,
    database:process.env.PG_DATABASE
}

let configPool = process.env.DATABASE_URL? {
    connectionString: process.env.DATABASE_URL,
    ssl:{rejectUnauthorized: false}
}: localConfigPool;

const pool = new Pool(configPool); 

if(pool){
    console.log("connected to databse")
}

module.exports = pool