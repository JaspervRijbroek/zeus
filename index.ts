import Express, { Request, Response, static as staticPath } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
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
import { IRouteDefinition } from './app/decorators/routing';
import { parseXMLBody } from './app/middleware/parseXML';
import { sync } from 'glob';
import { readFileSync, writeFileSync } from 'fs';
import { toJson } from 'xml2json';
import { Product } from './app/models/product';
import { parse as parsePath } from 'path';

// global.debug('nfsw');

const app = Express();
const port = 1337;

createConnection().then(() => {
    console.log('Database connection created!');
});

//     // Import all the catalog data.
//     let files = sync('./originalXML/catalog/*.xml'),
//         promises = files.map(file => {
//             let xmlContent = readFileSync(file),
//                 content = JSON.parse(toJson(xmlContent).toString()),
//                 parts = parsePath(file),
//                 category = parts.name.replace('productsInCategory_', '');

//             let items = content && content.ArrayOfProductTrans && content.ArrayOfProductTrans.ProductTrans;

//             if(!Array.isArray(items)) {
//                 items = [items];
//             }

//             if(!items.length) {
//                 return;
//             }

//             let prses = items.filter((item: any) => !!item).map((item: any) => {
//                 function getValue(val: any, fallback: any = '') {
//                     return typeof val != 'object' ? val : fallback;
//                 }

//                 let product = new Product();
//                 product.currency = getValue(item.Currency);
//                 product.description = getValue(item.Description);
//                 product.durationMinute = getValue(item.DurationMinute);
//                 product.category = category;
//                 product.hash = getValue(item.Hash);
//                 product.icon = getValue(item.Icon);
//                 product.level = getValue(item.Level);
//                 product.long_description = getValue(item.LongDescription);
//                 product.price = getValue(item.Price);
//                 product.priority = getValue(item.Priority);
//                 product.product_type = getValue(item.ProductType);
//                 product.secondary_icon = getValue(item.SecondaryIcon);
//                 product.use_count = getValue(item.UseCount);
//                 product.visual_style = getValue(item.VisualStyle);
//                 product.product_title = getValue(item.ProductTitle);
//                 product.product_type = getValue(item.ProductType);
//                 product.web_icon = '';
//                 product.web_location = '';

//                 return product.save()
//                     .catch(() => {
//                         console.log(product);
//                     });
//             });

//             return Promise.all(prses);
//         })

//     return Promise.all(promises);
// }).then(() => {
//     console.log('Data imported');
// });

app.use(parseXMLBody);

app.use(staticPath(`${__dirname}/static`));

app.use((req: Request, res: Response, next: Function) => {
    console.log(req.url);

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
    console.log(req.method);
    console.log(req.url);

    return res.status(200).send();
});


app.set('etag', false);
app.disable('x-powered-by');

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})