import { Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class SocialController {
    @Route('get', 'getfriendlistfromuserid')
    getFriendsList(req: Request, res: Response) {
        return res.json({
            PersonaFriendsList: {
                FriendPersona: {
                    FriendPersona: [{
                        iconIndex: 27,
                        level: 2578,
                        name: 'berkay2578',
                        originalName: 'Berkay Yigit',
                        personaId: 2578,
                        presence: 1,
                        socialNetwork: 'berkay2578',
                        userId: 2578
                    }]
                }
            }
        })
    }
}