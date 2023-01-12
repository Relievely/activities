import {app} from './app';
import {infoMessage} from "./logger";

const port = process.env.PORT;

app.listen(port, () => infoMessage(`Activities service listening on port: ${port}`))