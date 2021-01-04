import Express, {Request, Response, static as staticPath} from "express";
import {createReadStream, existsSync} from "fs";
import {createGzip} from "zlib";
import {parse} from "url";

const app = Express();
const port = 1337;
const personaID = 100;

app
    .use(staticPath(`${__dirname}/static`))
    .use((req: Request, res: Response, next: Function) => {
        req.url = req.url.replace('/Engine.svc', '');

        return next();
    })
    .all('/catalog/productsInCategory', (req: Request, res: Response, next: Function) => {
        let parts = parse(req.url);

        req.url = parts.pathname + `_${req.query.categoryName}`;
        console.log(req.url);

        return next();
    })
    .all('/catalog/categories', (req: Request, res: Response, next: Function) => {
        req.url = parse(req.url).pathname + `_${req.query.categoryName}`;
        console.log(req.url);

        return next();
    })
    .all('/personas/:personaID/baskets', (req: Request, res: Response, next: Function) => {
        req.url = 'baskets';

        return next();
    })
    .all('/DriverPersona/GetPersonaInfo', (req: Request, res: Response, next: Function) => {
        req.url += `_${personaID}`;

        return next();
    })
    .all('/DriverPersona/GetPersonaBaseFromList', (req: Request, res: Response, next: Function) => {
        req.url += `_${personaID}`;

        return next();
    })
    .all('/personas/inventory/objects', (req: Request, res: Response, next: Function) => {
        req.url = `/personas/${personaID}/objects`;

        return next();
    })
    .use((req: Request, res: Response, next: Function) => {
        res.header('Content-Type', 'application/xml;charset=utf-8')
            .status(200)
            .header('Connection', 'close')
            .header('Content-Encoding', 'gzip');

        let parsedUrl = parse(req.url),
            stream = null,
            basePath = `${process.cwd()}/originalXML`;

        console.log(basePath + parsedUrl.pathname)
        if (existsSync(basePath + parsedUrl.pathname)) {
            stream = createReadStream(basePath + parsedUrl.pathname);
        } else if (existsSync(basePath + parsedUrl.pathname + '.xml')) {
            stream = createReadStream(basePath + parsedUrl.pathname + '.xml');
        }

        if (stream) {
            return stream
                .pipe(createGzip())
                .pipe(res);
        } else {
            return res.send('');
        }
    });

app.set('etag', false);
app.disable('x-powered-by');

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});