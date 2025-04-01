import { ALIGNMENTS, CONDITIONS, CREATURE_SIZES, CREATURE_TYPES } from "../../../resources/srdEnums";
import { HitPoints } from "./HitPointsField";
import { Speed } from "./SpeedField";
import { AbilityScores } from "./AbilityScoresField";
import { Proficiencies } from "./ProficienciesField";
import { ArmorClass } from "./ArmorClassField";
import { Modifier } from "./Modifier";
import { DamageTypes } from "./damageTypesField";

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
    damageTypes: DamageTypes;
    conditionImmunities: Modifier<CONDITIONS>[];
    abilities: string[];
    image?: string;
    map_image?: string;
}