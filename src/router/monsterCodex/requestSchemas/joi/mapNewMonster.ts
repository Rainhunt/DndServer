import Monster, { IMonster } from "../../../../db/monsters/schema/Monster";
import { Modifier } from "../../../../db/schemas/creatureSchemas/Modifier";

function numOrModifierArray(requestField: number | { value: number, source: string }[], source: string): { value: number, source: string }[] {
    return typeof requestField === "number" ? [
        {
            value: requestField,
            source: source
        }
    ] : requestField
}

function enumArrayOrModifierArray(requestField: string[] | { value: string, source: string }[], source: string): { value: string, source: string }[] {
    return requestField.map((item) => typeof item === "string" ? {
        value: item,
        source: source
    } : item);
}

function sumModifierArray(modArr: Modifier<number>[]): number {
    return modArr.reduce((prev, current) => prev + current.value, 0);
}

export function mapNewMonster(requestBody: any, user: any): IMonster {
    const source: string = `homebrew`
    return new Monster({
        biome: requestBody.biome,
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
                : sumModifierArray(requestBody.hitPoints),
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
            skills: enumArrayOrModifierArray(requestBody.proficiencies?.skills || [], source),
            tools: enumArrayOrModifierArray(requestBody.proficiencies?.tools || [], source),
            savingThrows: enumArrayOrModifierArray(requestBody.proficiencies?.savingThrows || [], source),
            weapons: enumArrayOrModifierArray(requestBody.proficiencies?.weapons || [], source),
            armor: enumArrayOrModifierArray(requestBody.proficiencies?.armor || [], source),
            languages: enumArrayOrModifierArray(requestBody.proficiencies?.languages || [], source),
        },
        damageTypes: {
            resistances: enumArrayOrModifierArray(requestBody.proficiencies?.resistances || [], source),
            vulnerabilities: enumArrayOrModifierArray(requestBody.proficiencies?.vulnerabilities || [], source),
            immunities: enumArrayOrModifierArray(requestBody.proficiencies?.immunities || [], source),
        },
        conditionImmunities: requestBody.conditionImmunities,
        createdBy: user._id
    })
}