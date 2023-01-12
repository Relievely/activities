import pino from "pino";
import pretty from "pino-pretty";

const logger = pino(pretty({
    colorize: true
}));

export const infoMessage = (input: string) => logger.info(input);
export const errorMessage = (input: string) => logger.error(input);
export const warnMessage = (input: string) => logger.warn(input);