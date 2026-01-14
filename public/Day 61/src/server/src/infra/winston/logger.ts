import winston from "winston";
import path from "path";

const logFormat = winston.format.printf(
  (info: winston.Logform.TransformableInfo) => {
    return `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),

    new winston.transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
    }),
  ],
});

logger.exceptions.handle(
  new winston.transports.File({
    filename: path.join(__dirname, "../logs/exceptions.log"),
  })
);

export default logger;
