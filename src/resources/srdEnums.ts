export function matchEnum<T extends Record<string, string>>(enumType: T): RegExp {
    return RegExp(`^(${Object.values(enumType).join("|")})$`);
}

export enum ABILITY_SCORES {
    CHA = "cha",
    CON = "con",
    DEX = "dex",
    INT = "int",
    STR = "str",
    WIS = "wis"
}

export enum ALIGNMENTS {
    LawfulGood = "lawfulgood",
    LawfulNeutral = "lawfulneutral",
    LawfulEvil = "lawfulevil",
    NeutralGood = "neutralgood",
    TrueNeutral = "trueneutral",
    NeutralEvil = "neutralevil",
    ChaoticGood = "chaoticgood",
    ChaoticNeutral = "chaoticneutral",
    ChaoticEvil = "chaoticevil"
}

export enum ARMOR_TYPES {
    Light = "light",
    Medium = "medium",
    Heavy = "heavy"
}

export enum CONDITIONS {
    Blinded = "blinded",
    Charmed = "charmed",
    Deafened = "deafened",
    Frightened = "frightened",
    Grappled = "grappled",
    Incapacitated = "incapacitated",
    Invisible = "invisible",
    Paralyzed = "paralyzed",
    Petrified = "petrified",
    Poisoned = "poisoned",
    Prone = "prone",
    Restrained = "restrained",
    Stunned = "stunned",
    Unconscious = "unconscious"
}

export enum CREATURE_SIZES {
    Tiny = "tiny",
    Small = "small",
    Medium = "medium",
    Large = "large",
    Huge = "huge",
    Gargantuan = "gargantuan"
}

export enum CREATURE_TYPES {
    Aberration = "aberration",
    Beast = "beast",
    Celestial = "celestial",
    Construct = "construct",
    Dragon = "dragon",
    Elemental = "elemental",
    Fey = "fey",
    Fiend = "fiend",
    Giant = "giant",
    Humanoid = "humanoid",
    Monstrosity = "monstrosity",
    Ooze = "ooze",
    Plant = "plant",
    Undead = "undead"
}

export enum DAMAGE_TYPES {
    Acid = "acid",
    Bludgeoning = "bludgeoning",
    Cold = "cold",
    Fire = "fire",
    Force = "force",
    Lightning = "lightning",
    Necrotic = "necrotic",
    Piercing = "piercing",
    Poison = "poison",
    Psychic = "psychic",
    Radiant = "radiant",
    Slashing = "slashing",
    Thunder = "thunder"
}

export enum DICE {
    d4 = "d4",
    d6 = "d6",
    d8 = "d8",
    d10 = "d10",
    d12 = "d12",
    d20 = "d20"
}

export enum LANGUAGES {
    Abyssal = "abyssal",
    Aquan = "aquan",
    Celestial = "celestial",
    Common = "common",
    Draconic = "draconic",
    Dwarvish = "dwarvish",
    Elvish = "elvish",
    Giant = "giant",
    Gnomish = "gnomish",
    Goblin = "goblin",
    Infernal = "infernal",
    Orc = "orc",
    Primordial = "primordial",
    Sylvan = "sylvan",
    ThievesCant = "thievescant",
    Undercommon = "undercommon"
}

export enum SKILLS {
    Acrobatics = "acrobatics",
    AnimalHandling = "animalhandling",
    Arcana = "arcana",
    Athletics = "athletics",
    Deception = "deception",
    History = "history",
    Insight = "insight",
    Intimidation = "intimidation",
    Investigation = "investigation",
    Medicine = "medicine",
    Nature = "nature",
    Perception = "perception",
    Performance = "performance",
    Persuasion = "persuasion",
    Religion = "religion",
    SleightOfHand = "sleightofhand",
    Stealth = "stealth",
    Survival = "survival"
}

export enum SPEED_TYPES {
    Walk = "walk",
    Fly = "fly",
    Swim = "swim",
    Climb = "climb",
    Burrow = "burrow"
}

export enum TOOLS {
    AlchemistsSupplies = "alchemistssupplies",
    BrewersSupplies = "breweressupplies",
    CalligraphersSupplies = "calligrapherssupplies",
    CarpentersTools = "carpenterstools",
    CartographersTools = "cartographerstools",
    CooksUtensils = "cooksutensils",
    GlassblowersTools = "glassblowerstools",
    JewelersTools = "jewelerstools",
    LeatherworkersTools = "leatherworkerstools",
    MasonsTools = "masonstools",
    NavigatorsTools = "navigatorstools",
    PoisonersKit = "poisonerskit",
    SmithsTools = "smithstools",
    ThievesTools = "thievestools",
    TinkersTools = "tinkerstools",
    WeaversTools = "weaverstools",
    WoodcarversTools = "woodcarverstools"
}

export enum WEAPON_TYPES {
    Simple = "simple",
    Martial = "martial"
}
