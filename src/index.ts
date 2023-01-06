import {app} from './app';
import pino from "pino";

const port = process.env.PORT;

const logger = pino();

app.listen(port, () => logger.info(`Activities service listening on port: ${port}`))