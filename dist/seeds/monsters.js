"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedMonsters;
const chalk_1 = __importDefault(require("chalk"));
const addMonster_1 = require("../db/monsters/services/addMonster");
function seedMonsters(admin) {
    return __awaiter(this, void 0, void 0, function* () {
        const monsters = [
            {
                biome: "underworld",
                CR: 1,
                name: "goblin",
                size: "small",
                type: "humanoid",
                alignment: "neutral-evil",
                armorClass: {
                    base: [
                        {
                            value: 11,
                            source: "leather-armor-base"
                        },
                        {
                            value: 2,
                            source: "leather-armor-dex"
                        },
                    ],
                    modifiers: [
                        {
                            value: 2,
                            source: "shield"
                        }
                    ]
                },
                hitPoints: {
                    current: 7,
                    temp: 0,
                    sources: {
                        value: 7,
                        source: "2d6"
                    }
                },
                speed: [{
                        type: "walk",
                        base: [
                            {
                                value: 30,
                                source: "SRD"
                            }
                        ]
                    }],
                abilityScores: {
                    CHA: {
                        base: [{
                                value: 8,
                                source: "SRD"
                            }]
                    },
                    CON: {
                        base: [{
                                value: 10,
                                source: "SRD"
                            }]
                    },
                    DEX: {
                        base: [{
                                value: 14,
                                source: "SRD"
                            }]
                    },
                    INT: {
                        base: [{
                                value: 10,
                                source: "SRD"
                            }]
                    },
                    STR: {
                        base: [{
                                value: 8,
                                source: "SRD"
                            }]
                    },
                    WIS: {
                        base: [{
                                value: 8,
                                source: "SRD"
                            }]
                    }
                },
                proficiencies: {
                    proficiencyBonus: 2,
                    skills: [{
                            value: "stealth",
                            source: "SRD"
                        }],
                    languages: [
                        {
                            value: "common",
                            source: "SRD"
                        },
                        {
                            value: "goblin",
                            source: "SRD"
                        }
                    ]
                },
                damageTypes: {},
                createdBy: admin
            },
            {
                biome: "underworld",
                CR: 2,
                name: "mimic",
                size: "medium",
                type: "monstrosity",
                alignment: "true-neutral",
                armorClass: {
                    base: [
                        {
                            value: 12,
                            source: "natural"
                        }
                    ]
                },
                hitPoints: {
                    current: 58,
                    temp: 0,
                    sources: {
                        value: 58,
                        source: "9d8+18"
                    }
                },
                speed: [{
                        type: "walk",
                        base: [
                            {
                                value: 15,
                                source: "SRD"
                            }
                        ]
                    }],
                abilityScores: {
                    CHA: {
                        base: [{
                                value: 8,
                                source: "SRD"
                            }]
                    },
                    CON: {
                        base: [{
                                value: 15,
                                source: "SRD"
                            }]
                    },
                    DEX: {
                        base: [{
                                value: 12,
                                source: "SRD"
                            }]
                    },
                    INT: {
                        base: [{
                                value: 5,
                                source: "SRD"
                            }]
                    },
                    STR: {
                        base: [{
                                value: 17,
                                source: "SRD"
                            }]
                    },
                    WIS: {
                        base: [{
                                value: 13,
                                source: "SRD"
                            }]
                    }
                },
                proficiencies: {
                    proficiencyBonus: 2,
                    skills: [{
                            value: "stealth",
                            source: "SRD"
                        }]
                },
                damageTypes: {
                    immunities: [
                        {
                            value: "acid",
                            source: "SRD"
                        }
                    ]
                },
                conditionImmunities: [
                    {
                        value: "prone",
                        source: "SRD"
                    }
                ],
                createdBy: admin
            },
            {
                biome: "crypt",
                CR: 21,
                name: "lich",
                size: "medium",
                type: "undead",
                alignment: "neutral-evil",
                armorClass: {
                    base: [
                        {
                            value: 17,
                            source: "natural"
                        }
                    ]
                },
                hitPoints: {
                    current: 135,
                    temp: 0,
                    sources: {
                        value: 135,
                        source: "18d8+54"
                    }
                },
                speed: [{
                        type: "walk",
                        base: [
                            {
                                value: 30,
                                source: "SRD"
                            }
                        ]
                    }],
                abilityScores: {
                    CHA: {
                        base: [{
                                value: 16,
                                source: "SRD"
                            }]
                    },
                    CON: {
                        base: [{
                                value: 16,
                                source: "SRD"
                            }]
                    },
                    DEX: {
                        base: [{
                                value: 16,
                                source: "SRD"
                            }]
                    },
                    INT: {
                        base: [{
                                value: 20,
                                source: "SRD"
                            }]
                    },
                    STR: {
                        base: [{
                                value: 11,
                                source: "SRD"
                            }]
                    },
                    WIS: {
                        base: [{
                                value: 14,
                                source: "SRD"
                            }]
                    }
                },
                proficiencies: {
                    proficiencyBonus: 7,
                    skills: [{
                            value: "arcana",
                            source: "SRD"
                        }, {
                            value: "history",
                            source: "SRD"
                        }, {
                            value: "insight",
                            source: "SRD"
                        }, {
                            value: "perception",
                            source: "SRD"
                        }],
                    savingThrows: [{
                            value: "con",
                            source: "SRD"
                        }, {
                            value: "int",
                            source: "SRD"
                        }, {
                            value: "wis",
                            source: "SRD"
                        }]
                },
                damageTypes: {
                    resistances: [
                        {
                            value: "cold",
                            source: "SRD"
                        },
                        {
                            value: "lightning",
                            source: "SRD"
                        },
                        {
                            value: "necrotic",
                            source: "SRD"
                        }
                    ],
                    immunities: [
                        {
                            value: "cold",
                            source: "SRD"
                        },
                        {
                            value: "bludgeoning",
                            source: "SRD"
                        },
                        {
                            value: "piercing",
                            source: "SRD"
                        },
                        {
                            value: "slashing",
                            source: "SRD"
                        }
                    ]
                },
                conditionImmunities: [
                    {
                        value: "charmed",
                        source: "SRD"
                    },
                    {
                        value: "exhausted",
                        source: "SRD"
                    },
                    {
                        value: "frightened",
                        source: "SRD"
                    },
                    {
                        value: "paralyzed",
                        source: "SRD"
                    },
                    {
                        value: "poisoned",
                        source: "SRD"
                    }
                ],
                createdBy: admin
            }
        ];
        try {
            for (const monster of monsters) {
                try {
                    yield (0, addMonster_1.addMonster)(monster);
                }
                catch (err) {
                    const error = err;
                    console.log(chalk_1.default.redBright(`Failed to add ${monster.name}: ${error.message}`));
                }
            }
            console.log(chalk_1.default.greenBright("Seeded monsters in MongoDB"));
        }
        catch (err) {
            console.log(chalk_1.default.redBright("Internal server error"));
        }
    });
}
