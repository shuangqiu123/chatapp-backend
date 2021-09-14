import express from "express";
import pino from "pino";
import expressPino from "express-pino-logger";

const logger = pino({ level: "info" });
const expressLogger = expressPino({ logger });
const app = express();
const port = process.env.PORT;

app.use(expressLogger);

app.listen(port, () => {
	logger.info( `server started at http://localhost:${port}`);
});