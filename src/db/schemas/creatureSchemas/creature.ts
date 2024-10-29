import { ALIGNMENTS, CREATURE_SIZES, CREATURE_TYPES } from "../../../resources/srdEnums";
import { HitPoints } from "./HitPointsField";
import { Speed } from "./SpeedField";
import { AbilityScores } from "./AbilityScoresField";
import { Proficiencies } from "./ProficienciesField";
import { ArmorClass } from "./ArmorClassField";

export interface ICreature {
    name: string;
    size: CREATURE_SIZES;
    type: CREATURE_TYPES;
    alignment: ALIGNMENTS;
    armorClass: ArmorClass;
    hitPoints: HitPoints;
    speed: Speed[];
    abilityScores: AbilityScores;
    proficiencies: Proficiencies;
    // damage: damage;
    // conditionImmunities: modifier<CONDITIONS>[];
    // abilities: string[];
}