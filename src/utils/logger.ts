import { createLogger, format, transports } from "winston";
const { combine, timestamp, json } = format;

const logger = createLogger({
    level: "info",
    format: combine(timestamp(), json()),
    transports: [new transports.File({ filename: "app.log" })],
});

export default logger;