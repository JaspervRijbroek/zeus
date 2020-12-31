import Express from 'express';
import soapRoutes from './app/routes/soap';
import 'reflect-metadata';

// global.debug('nfsw');

const app = Express();
const port = 1337;

app.use(soapRoutes);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})