import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE,
    {
        dialect: 'postgres',
        dialectoptions: {
            ssl: true
        }
    }
);
