import {app} from './app';

const port = process.env.PORT;

import pino from "pino";

const logger = pino();

app.listen(port, () => logger.info(`Activities service listening on port: ${port}`))