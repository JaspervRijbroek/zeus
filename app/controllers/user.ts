import {Request, Response} from 'express'
import { Controller, Route } from '../decorators/routing';
import { toJson } from 'xml2json';

@Controller()
export default class UserController {
    @Route('post', 'User/GetPermanentSession')
    getPermanentSession(req: Request, res: Response) {
        let userId = req.headers['userid'] || false,
            token = req.headers['securitytoken'] || false;

        return res.json({
            UserInfo: {
                defaultPersonaIdx: 0,
                personas: {
                    ProfileData: {
                        Boost: 5000,
                        Cash: 50000,
                        IconIndex: 26,
                        Level: 2,
                        Motto: 'Offline first, lets make it online!',
                        Name: 'jasper199069',
                        PercentToLevel: 0,
                        PersonaId: 100,
                        Rating: 1067.2999999999995,
                        Rep: 0,
                        RepAtCurrentLevel: 0,
                        ccar: {}
                    }
                },
                user: {
                    address1: {},
                    address2: {},
                    country: {},
                    dateCreated: {},
                    dob: {},
                    email: {},
                    emailStatus: {},
                    firstName: {},
                    fullGameAccess: 'true',
                    gender: {},
                    idDigits: {},
                    isComplete: 'false',
                    landlinePhone: {},
                    language: {},
                    lastAuthDate: {},
                    lastName: {},
                    mobile: {},
                    nickname: {},
                    postalCode: {},
                    realName: {},
                    reasonCode: {},
                    remoteUserId: 1000000000001,
                    securityToken: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
                    starterPackEntitlementTag: 'NFSW_STARTER_PACK_B',
                    status: {},
                    subscribeMsg: 'false',
                    tosVersion: {},
                    userId,
                    username: {}
                }
            }
        });
    }

    @Route('get', 'getusersettings')
    getUserSettings(req: Request, res: Response) {
        return res.json({
            User_Settings: {
                CarCacheAgeLimit: 600,
                IsRaceNowEnabled: 'true',
                MaxCarCacheSize: 250,
                MinRaceNowLevel: 2,
                VoipAvailable: 'false',
                activatedHolidaySceneryGroups: {
                    'a:string': [
                        'SCENERY_GROUP_NORMAL',
                        'PLACEHOLDER'
                    ]
                },
                activeHolidayIds: {
                    'a:long': [
                        0,
                        9
                    ]
                },
                disactivatedHolidaySceneryGroups: {
                    'a:string': [
                        'SCENERY_GROUP_NORMAL_DISABLE',
                        'PLACEHOLDER'
                    ]
                },
                firstTimeLogin: 'true',
                maxLevel: 70,
                starterPackApplied: 'true',
                userId: 11111111
            }
        })
    }

    @Route('post', 'User/SecureLogout')
    secureLogout(req: Request, res: Response) {
        console.log(req.body);

        return res.status(200).send();
    }
}