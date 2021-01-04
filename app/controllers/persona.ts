import { json, Request, Response } from "express";
import { Controller, Route } from "../decorators/routing";

@Controller()
export default class PersonaController {
    @Route('get', 'DriverPersona/GetExpLevelPointsMap')
    getLevelMap(req: Request, res: Response) {
        return res.json({
            ArrayOfint: {
                int: [
                    100,
                    975,
                    2025,
                    3625,
                    5875,
                    8875,
                    12725,
                    17525,
                    23375,
                    30375,
                    39375,
                    50575,
                    64175,
                    80375,
                    99375,
                    121375,
                    146575,
                    175175,
                    207375,
                    243375,
                    283375,
                    327575,
                    376175,
                    429375,
                    487375,
                    550375,
                    618575,
                    692175,
                    771375,
                    856375,
                    950875,
                    1055275,
                    1169975,
                    1295375,
                    1431875,
                    1579875,
                    1739775,
                    1911975,
                    2096875,
                    2294875,
                    2506375,
                    2731775,
                    2971475,
                    3225875,
                    3495375,
                    3780375,
                    4081275,
                    4398475,
                    4732375,
                    5083375,
                    5481355,
                    5898805,
                    6336165,
                    6793875,
                    7272375,
                    7772105,
                    8293505,
                    8837015,
                    9403075,
                    9992125,
                    10581175,
                    11170225,
                    11759275,
                    12348325,
                    12937375,
                    13526425,
                    14115475,
                    14704525,
                    15293575,
                    15882625,
                    17829625
                ]
            }
        })
    }

    @Route('get', 'personas/:personaId/carslots')
    getCarSlots(req: Request, res: Response) {
        return res.json({
            CarSlotInfoTrans: {
                CarsOwnedByPersona: [{
                    CustomCar: {
                        BaseCar: -691868420,
                        CarClassHash: -2142411446,
                        Id: 20219847,
                        IsPreset: 'true',
                        Level: 0,
                        Name: 'car1006',
                        Paints: {
                            CustomPaintTrans: [{
                                Group: 42744494,
                                Hue: 496032328,
                                Sat: 0,
                                Slot: 0,
                                Var: 254
                            }]
                        },
                        PerformanceParts: {
                            PerformancePartTrans: [{
                                PerformancePartAttribHash: -880514079
                            }, {
                                PerformancePartAttribHash: -711274200
                            }, {
                                PerformancePartAttribHash: -1481726974
                            }, {
                                PerformancePartAttribHash: -1586660062
                            }, {
                                PerformancePartAttribHash: -595069127
                            }, {
                                PerformancePartAttribHash: -1432021954
                            }]
                        },
                        PhysicsProfileHash: -1792456729,
                        Rating: 771,
                        ResalePrice: 525000,
                        RideHeightDrop: 0,
                        SkillModParts: {},
                        SkillModSlotCount: 5,
                        Version: 0,
                        Vinyls: {},
                        VisualParts: {}
                    },
                    Durability: 100,
                    ExpirationDate: {},
                    Heat: 1,
                    Id: 1,
                    OwnershipType: 'PresetCar',
                }],
                DefaultOwnedCarIndex: 0,
                ObtainableSlots: {
                    ProductTrans: [{
                        BundleItems: {},
                        CategoryId: {},
                        Currency: '_NS',
                        Description: 'New car slot !!',
                        DurationMinute: 0,
                        Hash: -1143680669,
                        Icon: '128_cash',
                        Level: 0,
                        LongDescription: 'New car slot !!',
                        Price: 100.0000,
                        Priority: 0,
                        ProductId: 'SRV-CARSLOT',
                        ProductTitle: 'New car slot !!',
                        ProductType: 'CARSLOT',
                        SecondaryIcon: {},
                        UseCount: 1,
                        VisualStyle: {},
                        WebIcon: {},
                        WebLocation: {}
                    }]
                },
                OwnedCarSlotsCount: 5
            }
        })
    }
}