import Express, {Request, Response, static as staticPath} from 'express';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import AnnouncementsController from './app/controllers/announcements';
import CarsController from './app/controllers/cars';
import CatalogController from './app/controllers/catalog';
import ChatController from './app/controllers/chat';
import LoggingController from './app/controllers/logging';
import PersonaController from './app/controllers/persona';
import ReportingController from './app/controllers/reporting';
import SecurityController from './app/controllers/security';
import SocialController from './app/controllers/social';
import SystemController from './app/controllers/system';
import UserController from './app/controllers/user';
import {IRouteDefinition} from './app/decorators/routing';
import {parseXMLBody} from './app/middleware/parseXML';

global.debug = require('debug')('nfsw:http');

const app = Express();
const port = 1337;

// createConnection().then(() => {
//     console.log('Database connection created!');
// });

app
    .use(parseXMLBody)
    .use(staticPath(`${__dirname}/static`))
    .use((req: Request, res: Response, next: Function) => {
        global.debug(`${req.method} to ${req.url}`);

        return next();
    });

// Collect all the routes from the controllers
[
    AnnouncementsController,
    CarsController,
    CatalogController,
    ChatController,
    LoggingController,
    PersonaController,
    ReportingController,
    SecurityController,
    SocialController,
    SystemController,
    UserController
].forEach((Controller: any) => {
    let instance = new Controller();

    Reflect.getMetadata('routes', Controller)
        .forEach((route: IRouteDefinition) => {
            app[route.method](route.path, instance[route.methodName]);
        })
});

app.use((req: Request, res: Response, next: Function) => {
    global.debug(`Missing handler for ${req.method} to ${req.url}`);

    return res.status(200).send();
});


app.set('etag', false);
app.disable('x-powered-by');

app.listen(port, () => {
    global.debug(`Server started on port: ${port}`);
});