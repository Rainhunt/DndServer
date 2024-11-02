"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapNewMonster = mapNewMonster;
const Monster_1 = __importDefault(require("../../../../db/monsters/schema/Monster"));
function numOrModifierArray(requestField, source) {
    return typeof requestField === "number" ? [
        {
            value: requestField,
            source: source
        }
    ] : requestField;
}
function mapNewMonster(requestBody, source = "Homebrew") {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return new Monster_1.default({
        CR: requestBody.CR,
        name: requestBody.name,
        size: requestBody.size,
        type: requestBody.type,
        alignment: requestBody.alignment,
        armorClass: {
            base: numOrModifierArray(requestBody.armorClass, source)
        },
        hitPoints: {
            current: typeof requestBody.hitPoints === "number" ? requestBody.hitPoints
                : requestBody.armorClass,
            temp: 0,
            sources: numOrModifierArray(requestBody.hitPoints, source)
        },
        speed: typeof requestBody.speed === "number" ? [
            {
                type: "walk",
                base: [
                    {
                        value: requestBody.speed,
                        source: source
                    }
                ]
            }
        ] : requestBody.speed,
        abilityScores: {
            CHA: {
                base: numOrModifierArray(requestBody.abilityScores.CHA, source)
            },
            CON: {
                base: numOrModifierArray(requestBody.abilityScores.CON, source)
            },
            DEX: {
                base: numOrModifierArray(requestBody.abilityScores.DEX, source)
            },
            INT: {
                base: numOrModifierArray(requestBody.abilityScores.INT, source)
            },
            STR: {
                base: numOrModifierArray(requestBody.abilityScores.STR, source)
            },
            WIS: {
                base: numOrModifierArray(requestBody.abilityScores.WIS, source)
            }
        },
        proficiencies: {
            skills: (_a = requestBody.proficiencies) === null || _a === void 0 ? void 0 : _a.skills,
            tools: (_b = requestBody.proficiencies) === null || _b === void 0 ? void 0 : _b.skills,
            savingThrows: (_c = requestBody.proficiencies) === null || _c === void 0 ? void 0 : _c.skills,
            weapons: (_d = requestBody.proficiencies) === null || _d === void 0 ? void 0 : _d.skills,
            armor: (_e = requestBody.proficiencies) === null || _e === void 0 ? void 0 : _e.skills,
            languages: (_f = requestBody.proficiencies) === null || _f === void 0 ? void 0 : _f.skills,
        },
        damageTypes: {
            resistances: (_g = requestBody.damageTypes) === null || _g === void 0 ? void 0 : _g.resistances,
            vulnerabilities: (_h = requestBody.damageTypes) === null || _h === void 0 ? void 0 : _h.vulnerabilities,
            immunities: (_j = requestBody.damageTypes) === null || _j === void 0 ? void 0 : _j.immunities,
        },
        conditionImmunities: requestBody.conditionImmunities
    });
}
