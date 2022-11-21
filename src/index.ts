import {app} from './app';

const port = process.env.PORT;

app.listen(port, () => console.log(`Activities service listening on port: ${port}`))