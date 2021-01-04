import { Request, Response, Send } from "express";
import { toJson } from 'xml2json';
import { parse } from 'js2xmlparser';
import { gzipSync } from 'zlib';
import { writeFileSync } from 'fs';
import { parse as parseUri } from 'url'

export function parseXMLBody(req: Request, res: Response, next: Function) {
    if(req.headers['content-type'] && !req.headers['content-type'].includes('text/xml')) {
        return next();
    }

    res.json = (body: any): Response => {
        // get the root key.
        let keys = Object.keys(body),
            xmlBody = body[keys[0]];
        
        xmlBody = parse(keys[0], xmlBody, {
            declaration: {
                include: false
            },
            format: {
                doubleQuotes: true
            },
            useSelfClosingTagIfEmpty: true
        });

        let uri = parseUri(req.url);
        if(uri.pathname) {
            writeFileSync(process.cwd() + '/requests/' + uri.pathname.replace(/\//g, '_') + '.xml', xmlBody);
        }

        let encodedBody = gzipSync(xmlBody);

        return res.status(200)
            .header('Content-Length', encodedBody.length.toString())
            .header('Content-Type', 'application/xml;charset=utf-8')
            .header("Content-Encoding", "gzip")
            .header('Connection', 'close')
            .send(encodedBody);
    }

    let requestData = '';

    req.on('data', (chunk) => {
        requestData += chunk.toString();
    });

    req.on('end', function() {
        if(requestData) {
            req.body = JSON.parse(toJson(requestData));
        }

        console.log(req.body);
        return next();
    });
}