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
    LawfulGood = "lawful-good",
    LawfulNeutral = "lawful-neutral",
    LawfulEvil = "lawful-evil",
    NeutralGood = "neutral-good",
    TrueNeutral = "true-neutral",
    NeutralEvil = "neutral-evil",
    ChaoticGood = "chaotic-good",
    ChaoticNeutral = "chaotic-neutral",
    ChaoticEvil = "chaotic-evil"
}

export enum ARMOR_TYPES {
    Light = "light",
    Medium = "medium",
    Heavy = "heavy"
}

export enum BIOMES {
    Crypt = "crypt",
    Desert = "desert",
    Forest = "forest",
    Mountain = "mountain",
    Ocean = "ocean",
    Sky = "sky",
    Swamp = "swamp",
    Underworld = "underworld",
    Urban = "urban",
    Wasteland = "wasteland"
}

export enum CONDITIONS {
    Blinded = "blinded",
    Charmed = "charmed",
    Deafened = "deafened",
    Exhausted = "exhausted",
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
    ThievesCant = "thieves-cant",
    Undercommon = "undercommon"
}

export enum SKILLS {
    Acrobatics = "acrobatics",
    AnimalHandling = "animal-handling",
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
    SleightOfHand = "sleight-of-hand",
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
    AlchemistsSupplies = "alchemists-supplies",
    BrewersSupplies = "breweres-supplies",
    CalligraphersSupplies = "calligraphers-supplies",
    CarpentersTools = "carpenters-tools",
    CartographersTools = "cartographers-tools",
    CooksUtensils = "cooks-utensils",
    GlassblowersTools = "glassblowers-tools",
    JewelersTools = "jewelers-tools",
    LeatherworkersTools = "leatherworkers-tools",
    MasonsTools = "masons-tools",
    NavigatorsTools = "navigators-tools",
    PoisonersKit = "poisoners-kit",
    SmithsTools = "smiths-tools",
    ThievesTools = "thieves-tools",
    TinkersTools = "tinkers-tools",
    WeaversTools = "weavers-tools",
    WoodcarversTools = "woodcarvers-tools"
}

export enum WEAPON_TYPES {
    Simple = "simple",
    Martial = "martial"
}
