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
function enumArrayOrModifierArray(requestField, source) {
    return requestField.map((item) => typeof item === "string" ? {
        value: item,
        source: source
    } : item);
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
            skills: enumArrayOrModifierArray(((_a = requestBody.proficiencies) === null || _a === void 0 ? void 0 : _a.skills) || [], source),
            tools: enumArrayOrModifierArray(((_b = requestBody.proficiencies) === null || _b === void 0 ? void 0 : _b.tools) || [], source),
            savingThrows: enumArrayOrModifierArray(((_c = requestBody.proficiencies) === null || _c === void 0 ? void 0 : _c.savingThrows) || [], source),
            weapons: enumArrayOrModifierArray(((_d = requestBody.proficiencies) === null || _d === void 0 ? void 0 : _d.weapons) || [], source),
            armor: enumArrayOrModifierArray(((_e = requestBody.proficiencies) === null || _e === void 0 ? void 0 : _e.armor) || [], source),
            languages: enumArrayOrModifierArray(((_f = requestBody.proficiencies) === null || _f === void 0 ? void 0 : _f.languages) || [], source),
        },
        damageTypes: {
            resistances: enumArrayOrModifierArray(((_g = requestBody.proficiencies) === null || _g === void 0 ? void 0 : _g.resistances) || [], source),
            vulnerabilities: enumArrayOrModifierArray(((_h = requestBody.proficiencies) === null || _h === void 0 ? void 0 : _h.vulnerabilities) || [], source),
            immunities: enumArrayOrModifierArray(((_j = requestBody.proficiencies) === null || _j === void 0 ? void 0 : _j.immunities) || [], source),
        },
        conditionImmunities: requestBody.conditionImmunities
    });
}
