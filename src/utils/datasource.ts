import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize:true,  
    ssl: { rejectUnauthorized: false }, 
    entities: [
        "src/entities/**/*.ts"
     ],
     migrations: [
        "src/migration/**/*.ts"
     ],
     subscribers: [
        "src/subscriber/**/*.ts"
     ]
})

export default AppDataSource;