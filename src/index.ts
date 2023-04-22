require('dotenv').config();
import "reflect-metadata";//typeorm 
import { json, urlencoded } from "body-parser";
import cors from 'cors';
import express from 'express';
import logger from './utils/logger';
import MainController from "./controllers";
import DataSource from './utils/datasource';
const server = express()
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(cors());

server.listen(process.env.PORT || 4200, async () => {
    logger.info(`Server started at PORT ${process.env.PORT} in ${process.env.NODE_ENV}`);

    DataSource.initialize()
        .then(() => {
            logger.info("Data Source has been initialized!")
        })
        .catch((err) => {
            logger.error("Error during Data Source initialization", err)
        })
})


server.get('/healthcheck', async (req, res) => {
    try {
        return res.json({ message: "healthy", success: true });
    } catch (err) {
        res.status(500).send({ message: 'Unhealthy', details: err, success: false });
    }
});

server.use("/api", MainController);

server.use((err, req, res, next) => {
    logger.error(err);
    if (err.includes('duplicate key error') || err.includes('duplicate key value'))
        res.status(400).send({ message: 'value already exist. please use different value', success: false });
    else
        res.status(400).send({ message: err, success: false })

})