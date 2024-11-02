import Monster, { IMonster } from "../../../../db/monsters/schema/Monster";

function numOrModifierArray(requestField: number | { value: number, source: string }[], source: string): { value: number, source: string }[] {
    return typeof requestField === "number" ? [
        {
            value: requestField,
            source: source
        }
    ] : requestField
}

export function mapNewMonster(requestBody: any, source: string = "Homebrew"): IMonster {
    return new Monster({
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
            skills: requestBody.proficiencies?.skills,
            tools: requestBody.proficiencies?.skills,
            savingThrows: requestBody.proficiencies?.skills,
            weapons: requestBody.proficiencies?.skills,
            armor: requestBody.proficiencies?.skills,
            languages: requestBody.proficiencies?.skills,
        },
        damageTypes: {
            resistances: requestBody.damageTypes?.resistances,
            vulnerabilities: requestBody.damageTypes?.vulnerabilities,
            immunities: requestBody.damageTypes?.immunities,
        },
        conditionImmunities: requestBody.conditionImmunities
    })
}