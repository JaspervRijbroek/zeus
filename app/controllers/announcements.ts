import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class AnnouncementsController {
    @Route('get', 'LoginAnnouncements')
    getLoginAnnouncements(req: Request, res: Response) {
        return res.json({
            LoginAnnouncementsDefinition: {
                Announcements: {
                    LoginAnnouncementDefinition: [{
                        Context: 'NotApplicable',
                        Id: 1,
                        ImageChecksum: -1,
                        ImageUrl: 'snap.jpg',
                        Type: 'ImageOnly',
                    }, {
                        Context: 'NotApplicable',
                        Id: 2,
                        ImageChecksum: -1,
                        ImageUrl: 'snap2.jpg',
                        Type: 'ImageOnly',
                    }, {
                        Context: 'NotApplicable',
                        Id: 3,
                        ImageChecksum: -1,
                        ImageUrl: 'snap3.jpg',
                        Type: 'ImageOnly',
                    }, {
                        Context: 'NotApplicable',
                        Id: 4,
                        ImageChecksum: -1,
                        ImageUrl: 'snap.jpg',
                        Type: 'ImageOnly',
                    }]
                },
                ImagesPath: 'http://localhost:1337/announcements'
            }
        });
    }
}