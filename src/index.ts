import express from "express";
import pino from "pino";
import expressPino from "express-pino-logger";
import connect from "./model/index";

const logger = pino({ level: "info" });
const expressLogger = expressPino({ logger });
const app = express();
const port = process.env.PORT;

app.use(expressLogger);

connect()
	.then(() => {
		logger.info("Database has successfully connected");
	})
	.catch(error => {
		logger.info("Database has not connected");
		logger.error(error);
	});

app.listen(port, () => {
	logger.info( `server started at http://localhost:${port}`);
});