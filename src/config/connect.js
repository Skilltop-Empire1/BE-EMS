//const pg  = require("pg")
//const {Pool} = pg;
const {Sequelize} = require("sequelize")

require("dotenv").config()

console.log(process.env.PG_HOST)

let localConfig = {
    user:process.env.PG_USER,
    password:process.env.PG_PASSWORD,
    host:process.env.PG_HOST,
    port:process.env.PG_PORT,
    database:process.env.PG_DATABASE,
    dialect:process.env.PG_DIALECT
}

let config = process.env.DATABASE_URL? {
    url:process.env.DATABASE_URL,
    dialect:process.env.PG_DIALECT,
    dialectOptions:{
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    }
}: localConfig;

const sequelize = new Sequelize(
    config.url || config.database,
    config.user,
    config.password,
    config
); 

if(sequelize){
    console.log("connected to databse")
}

module.exports = sequelize