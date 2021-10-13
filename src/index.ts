import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./config/swagger.json";
import pino from "pino";
import expressPino from "express-pino-logger";
import connect from "./model/index";
import AuthRouter from "./routes/auth";
import ChannelRouter from "./routes/channel";
import UserRouter from "./routes/users";

const logger = pino({ level: "info" });
const expressLogger = expressPino({ logger });
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(expressLogger);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/channel", ChannelRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

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