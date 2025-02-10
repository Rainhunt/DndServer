
#  DND Server Project

  

Welcome to the DND Server Project, an Express.js application designed to facilitate the management of Dungeons & Dragons (DND) resources through a RESTful API. This API allows players, Dungeon Masters, and developers to interact with the System Reference Document (SRD) and manage their own homebrew content, including monsters, character data, and more.

  

## Table of Contents

- [Installation](#installation)
  - [System Requirements](#system-requirements)
  - [Steps](#steps)
- [Usage](#usage)
- [Features](#features)
  - [Key Libraries Used](#summary-of-key-libraries-used)
  - [Environment-Based Configuration](#environment-based-configuration)
  - [Authentication & Authorization](#authentication--authorization)
  - [User Management](#user-management)
  - [Monsters Management](#monsters-management)
  - [Data Validation & Input Handling](#data-validation--input-handling)
  - [Logging and Debugging](#logging-and-debugging)
  - [CORS (Cross-Origin Resource Sharing)](#cors-cross-origin-resource-sharing)
  - [Mongoose](#mongoose)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
    - [POST /users/signup](#post-userssignup)
    - [POST /users/login](#post-userslogin)
    - [GET /users/:id](#get-usersid)
    - [GET /users](#get-users)
    - [PUT /users/:id](#put-usersid)
    - [DELETE /users/:id](#delete-usersid)
  - [Monster Codex Endpoints](#monster-codex-endpoints)
    - [POST /monsters](#post-monsters)
    - [GET /monsters/my-creations](#get-monstersmy-creations)
    - [GET /monsters/:id](#get-monstersid)
    - [GET /monsters](#get-monsters)
    - [PUT /monsters/:id](#put-monstersid)
    - [DELETE /monsters/:id](#delete-monstersid)
  - [Enums Used](#enums-used)
    - [ABILITY_SCORES](#ability_scores)
    - [ALIGNMENTS](#alignments)
    - [ARMOR_TYPES](#armor_types)
    - [CONDITIONS](#conditions)
    - [CREATURE_SIZES](#creature_sizes)
    - [CREATURE_TYPES](#creature_types)
    - [DAMAGE_TYPES](#damage_types)
    - [LANGUAGES](#languages)
    - [SKILLS](#skills)
    - [SPEED_TYPES](#speed_types)
    - [TOOLS](#tools)
    - [WEAPON_TYPES](#weapon_types)




##  Installation

  

To install and set up the project locally, follow these steps:  

###  System Requirements

  

- Node.js: Version 14 or higher (can be downloaded from [nodejs.org](https://nodejs.org/)).
- npm: Comes bundled with Node.js (ensure it’s updated to version 6 or higher).
- MongoDB: You can either use a local MongoDB instance or MongoDB Atlas for a cloud database.
  
###  Steps
1. Clone the repository:
```bash
git clone https://github.com/Rainhunt/DndServer
```
2. Install the libraries:
```bash
cd dndserver
npm install
```
3. Set the necessary ENVs (change the values as necessary):
```bash
cp .env.example .env
```
4. Seed the DB:
Ensure MongoDB is running if using locally.
```bash
npm run seed
```


## Usage
1. Ensure MongoDB is running if using locally.
2. Start the server:
```bash
npm start #Ensure ATLAS connection string is correct (in .env)
npm run dev #Ensure MongoDB is running locally and LH connection string is correct (in .env)
```

3. Send requests, e.g:
```bash
GET http://localhost:8181/monsters
```

## Features

### Summary of Key Libraries Used:
- **express**: A minimal and flexible Node.js web application framework.
- **mongoose**: An Object Data Modeling (ODM) library for MongoDB, simplifying database interactions.
- **joi**: A powerful data validation library for JavaScript.
- **bcrypt**: A library for hashing passwords securely.
- **jsonwebtoken (jwt)**: Used for secure token-based authentication.
- **morgan**: HTTP request logging middleware.
- **chalk**: A library for colorizing terminal output, used to style logs.
- **cors**: Middleware to handle cross-origin resource sharing.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.

---

This project includes several key features that make it robust and flexible for managing users, monsters, and request authentication. Below is an overview of the features and how they work:

### 1. **Environment-Based Configuration**
   - **Environment Variables**: The project uses a `.env` file to manage different environment variables such as `PORT`, `NODE_ENV`, `MONGO_LH_CONNECTION_STRING`, `MONGO_ATLAS_CONNECTION_STRING`, `JWT_SECRET`, and `CORS_ORIGINS`.
   - **Configurable Settings**: Configuration is centralized and easily adjustable for different environments (development, production, etc.), allowing for seamless transitions between local and production environments.

### 2. **Authentication & Authorization**
   - **JWT Authentication**: All protected routes require a valid **JWT token** to be sent in the `x-auth-token` header. Tokens are used to authenticate users and determine their role (user or admin).
   - **bcrypt Password Hashing**: User passwords are securely hashed with **bcrypt** before being stored in the database, ensuring that passwords are never stored as plain text.
   - **Role-Based Access Control (RBAC)**: Admin users have permissions to create, read, update, and delete all data. Regular users can only access their own data, and admins can manage other users’ data.

### 3. **User Management**
   - **User CRUD Operations**: The system allows for user registration, login, and the ability to perform CRUD (Create, Read, Update, Delete) operations on their own data.

### 4. **Monsters Management**
   - **SRD Monsters**: The application comes pre-seeded with **System Reference Document (SRD)** monsters, available for all users to read.
   - **Homebrew Monsters**: Users can create custom "homebrew" monsters, which are saved to the database. Admins can perform CRUD operations on all monsters, both SRD and homebrew.

### 5. **Data Validation & Input Handling**
   - **Joi Validation**: All incoming request data is validated using **Joi**, ensuring that data adheres to the expected structure and format before it’s processed.
   - **Error Handling**: Requests that don't meet the validation criteria are automatically rejected with informative error messages to guide users in providing the correct input.

### 6. **Logging and Debugging**
   - **Morgan Logger**: **Morgan** is used to log HTTP requests, including method, URL, status, and response time.
   - **Color-Coded Logs**: Logs are color-coded with **Chalk** to make it easier to differentiate between various log levels (e.g., success, error) in the terminal.

### 7. **CORS (Cross-Origin Resource Sharing)**
   - **CORS Management**: **CORS** middleware is configured to allow cross-origin requests from specific domains. The allowed origins are configurable via the `CORS_ORIGINS` environment variable, making it flexible for both local development and production environments.

### 8. **Mongoose**
   - **Mongoose Integration**: The app uses **Mongoose** to interact with MongoDB, allowing easy schema management and CRUD operations.
   - **Virtual Fields**: Mongoose **virtuals** are included in models to compute additional fields in data before sending it in the response (e.g., computed fields like `hitPoints.max` and `armorClass.value`).



## API Documentation

### User Endpoints

This section covers the API routes related to user authentication, management, and profile manipulation.

---

#### POST `/users/signup`
**Description:**  
Creates a new user account with the provided information.

**Request Body:**  
```json
{
    "name": {
        "first": Required. A string between 2 and 256 characters,
        "middle": Optional. A string between 2 and 256 characters,
        "last": Required. A string between 2 and 256 characters
    },
    "email": Required. Must be a valid email format,
    "password": Required. Must contain 8-20 characters, one uppercase letter, one lowercase letter, one number, and one special character
}
```

---

#### POST `/users/login`
**Description:**  
Authenticates a user by their email and password and returns a JWT token for further interactions.

**Request Body:**  
```json
{
    "email": Required. Must be a valid email format,
    "password": Required. Must match the users password
}
```

---

#### GET `/users/:id`
**Description:**  
Fetches the user profile for a given user ID. An authenticated user can view their own profile and an admin can view any user profile.

**Request Header:**  
- `x-auth-token`: JWT_TOKEN

**Request Parameters:**  
- `id`: The ID of the user whose profile is being requested.

---

#### GET `/users`
**Description:**  
Fetches all users. This route is restricted to admins only.

**Request Header:**  
- `x-auth-token`: JWT_TOKEN

---

#### PUT `/users/:id`
**Description:**  
Updates the details of a user profile. A user can only update their own profile, unless they are an admin.

**Request Header:**  
- `x-auth-token`: JWT_TOKEN

**Request Parameters:**  
- `id`: The ID of the user whose profile is being updated.

**Request Body:**  
```json
{
    "name": {
        "first": Required. A string between 2 and 256 characters,
        "middle": Optional. A string between 2 and 256 characters,
        "last": Required. A string between 2 and 256 characters
    }
}
```

---

#### DELETE `/users/:id`
**Description:**  
Deletes a user profile. A user can only delete their own profile unless they are an admin.

**Request Header:**  
- `x-auth-token`: JWT_TOKEN

**Request Parameters:**  
- `id`: The ID of the user to be deleted.

---

### Monster Codex Endpoints

This section covers the API routes related to monster management, including creating, retrieving, updating and deleting monsters.

A modifier is an object with the following format:
```json
{
"value":  Required. Either a number or a string member of an enum,
"source":  Required. A string between 2 and 256 characters long
}
```

---

#### POST `/monsters`
**Description:**  
Creates a new monster entry. Attaches the provided `user_id` ref (in the jwt) to the monster in the `createdBy` field.

**Request Header:**  
- `x-auth-token`: JWT_TOKEN

**Request Body:**  
```json
{
	"name":  Required. A string between 2 and 256 characters long,
	"CR": Required. A number between 0 and 40,
	"alignment":  Required. A value from the ALIGNMENTS enum,
	"type":  Required. A value from the CREATURE_TYPES enum,
	"size":  Required. A value from the CREATURE_SIZES enum,
	"speed":  Required. A number between 1 and 1000000 which corresponds to the walking speed or an array of speed objects containing the speed type and an array of number modifiers,
	"armorClass":  Required. A number between 1 and 40 or an array of number modifiers,
	"hitPoints":  Required. A number between 1 and 1000000 or an array of number modifiers,
	"abilityScores":  {
		"CHA":  Required. A number between 1 and 100 or an array of number modifiers,
		"CON":  Required. A number between 1 and 100 or an array of number modifiers,
		"DEX":  Required. A number between 1 and 100 or an array of number modifiers,
		"INT":  Required. A number between 1 and 100 or an array of number modifiers,
		"STR":  Required. A number between 1 and 100 or an array of number modifiers,
		"WIS":  Required. A number between 1 and 100 or an array of number modifiers
	},
	"proficiencies": (Optional) {
		"skills": Optional. An array of values from the SKILLS enum or an array of modifiers of those values,
		"tools": Optional. An array of values from the TOOLS enum or an array of modifiers of those values,
		"savingThrows": Optional. An array of values from the ABILITY_SCORES enum or an array of modifiers of those values,
		"weapons": Optional. An array of values from the WEAPON_TYPES enum or an array of modifiers of those values,
		"armor": Optional. An array of values from the ARMOR_TYPES enum or an array of modifiers of those values,
		"languages": Optional. An array of values from the LANGUAGES enum or an array of modifiers of those values
	}
	"damageTypes": (Optional) {
		"resistances": Optional. An array of values from the DAMAGE_TYPES enum or an array of modifiers of those values
		"vulnerabilities": Optional. An array of values from the DAMAGE_TYPES enum or an array of modifiers of those values,
		"immunities": Optional. An array of values from the DAMAGE_TYPES enum or an array of modifiers of those values,
	}
	"conditionImmunities": Optional. An array of values from the CONDITIONS enum or an array of modifiers of those values
}
```

---

#### GET `/monsters/my-creations`
**Description:**  
Fetches a list of monsters created by the user.

**Request Header:**  
- `x-auth-token`: JWT_TOKEN

---

#### GET `/monsters/:id`
**Description:**  
Fetches the monster statblock for a given user ID.

**Request Parameters:**  
- `id`: The ID of the monster to retrieve.

---

#### GET `/monsters`
**Description:**  
Fetches a list of all monsters.

---

#### GET `/monsters/full-statblock`
**Description:**  
Fetches a more detailed list of all monsters

---

#### PUT `/monsters/:id`
**Description:**  
Edits an existing monster. A user can only edit their own monsters unless they are an admin.

**Request Header:**  
- `x-auth-token`: JWT_TOKEN

**Request Parameters:**  
- `id`: The ID of the monster to be updated.


**Request Body:**  
```json
{
	"CR": Required. A number between 0 and 40,
	"alignment":  Required. A value from the ALIGNMENTS enum,
	"type":  Required. A value from the CREATURE_TYPES enum,
	"size":  Required. A value from the CREATURE_SIZES enum,
	"speed":  Required. A number between 1 and 1000000 which corresponds to the walking speed or an array of speed objects containing the speed type and an array of number modifiers,
	"armorClass":  Required. A number between 1 and 40 or an array of number modifiers,
	"hitPoints":  Required. A number between 1 and 1000000 or an array of number modifiers,
	"abilityScores":  {
		"CHA":  Required. A number between 1 and 100 or an array of number modifiers,
		"CON":  Required. A number between 1 and 100 or an array of number modifiers,
		"DEX":  Required. A number between 1 and 100 or an array of number modifiers,
		"INT":  Required. A number between 1 and 100 or an array of number modifiers,
		"STR":  Required. A number between 1 and 100 or an array of number modifiers,
		"WIS":  Required. A number between 1 and 100 or an array of number modifiers
	},
	"proficiencies": (Optional) {
		"skills": Optional. An array of values from the SKILLS enum or an array of modifiers of those values,
		"tools": Optional. An array of values from the TOOLS enum or an array of modifiers of those values,
		"savingThrows": Optional. An array of values from the ABILITY_SCORES enum or an array of modifiers of those values,
		"weapons": Optional. An array of values from the WEAPON_TYPES enum or an array of modifiers of those values,
		"armor": Optional. An array of values from the ARMOR_TYPES enum or an array of modifiers of those values,
		"languages": Optional. An array of values from the LANGUAGES enum or an array of modifiers of those values
	}
	"damageTypes": (Optional) {
		"resistances": Optional. An array of values from the DAMAGE_TYPES enum or an array of modifiers of those values
		"vulnerabilities": Optional. An array of values from the DAMAGE_TYPES enum or an array of modifiers of those values,
		"immunities": Optional. An array of values from the DAMAGE_TYPES enum or an array of modifiers of those values,
	}
	"conditionImmunities": Optional. An array of values from the CONDITIONS enum or an array of modifiers of those values
}
```

---

#### DELETE `/monsters/:id`
**Description:**  
Deletes a monster by its ID. Only the creator of the monster or an admin can delete it.

**Request Header:**  
- `x-auth-token`: JWT_TOKEN

**Request Parameters:**  
- `id`: The ID of the monster to be deleted.

---

### Enums Used

#### ABILITY_SCORES

| Name | Value       |
|------|-------------|
| CHA  | "cha"       |
| CON  | "con"       |
| DEX  | "dex"       |
| INT  | "int"       |
| STR  | "str"       |
| WIS  | "wis"       |

#### ALIGNMENTS

| Name          | Value           |
|---------------|-----------------|
| LawfulGood    | "lawful-good"   |
| LawfulNeutral | "lawful-neutral"|
| LawfulEvil    | "lawful-evil"   |
| NeutralGood   | "neutral-good"  |
| TrueNeutral   | "true-neutral"  |
| NeutralEvil   | "neutral-evil"  |
| ChaoticGood   | "chaotic-good"  |
| ChaoticNeutral| "chaotic-neutral"|
| ChaoticEvil   | "chaotic-evil"  |

#### ARMOR_TYPES

| Name   | Value  |
|--------|--------|
| Light  | "light"|
| Medium | "medium"|
| Heavy  | "heavy"|

#### CONDITIONS

| Name        | Value        |
|-------------|--------------|
| Blinded     | "blinded"    |
| Charmed     | "charmed"    |
| Deafened    | "deafened"   |
| Exhausted   | "exhausted"  |
| Frightened  | "frightened" |
| Grappled    | "grappled"   |
| Incapacitated| "incapacitated" |
| Invisible   | "invisible"  |
| Paralyzed   | "paralyzed"  |
| Petrified   | "petrified"  |
| Poisoned    | "poisoned"   |
| Prone       | "prone"      |
| Restrained  | "restrained" |
| Stunned     | "stunned"    |
| Unconscious | "unconscious"|

#### CREATURE_SIZES

| Name        | Value         |
|-------------|---------------|
| Tiny        | "tiny"        |
| Small       | "small"       |
| Medium      | "medium"      |
| Large       | "large"       |
| Huge        | "huge"        |
| Gargantuan  | "gargantuan"  |

#### CREATURE_TYPES

| Name         | Value         |
|--------------|---------------|
| Aberration   | "aberration"  |
| Beast        | "beast"       |
| Celestial    | "celestial"   |
| Construct    | "construct"   |
| Dragon       | "dragon"      |
| Elemental    | "elemental"   |
| Fey          | "fey"         |
| Fiend        | "fiend"       |
| Giant        | "giant"       |
| Humanoid     | "humanoid"    |
| Monstrosity  | "monstrosity" |
| Ooze         | "ooze"        |
| Plant        | "plant"       |
| Undead       | "undead"      |

#### DAMAGE_TYPES

| Name        | Value        |
|-------------|--------------|
| Acid        | "acid"       |
| Bludgeoning | "bludgeoning"|
| Cold        | "cold"       |
| Fire        | "fire"       |
| Force       | "force"      |
| Lightning   | "lightning"  |
| Necrotic    | "necrotic"   |
| Piercing    | "piercing"   |
| Poison      | "poison"     |
| Psychic     | "psychic"    |
| Radiant     | "radiant"    |
| Slashing    | "slashing"   |
| Thunder     | "thunder"    |

#### LANGUAGES

| Name          | Value        |
|---------------|--------------|
| Abyssal       | "abyssal"    |
| Aquan         | "aquan"      |
| Celestial     | "celestial"  |
| Common        | "common"     |
| Draconic      | "draconic"   |
| Dwarvish      | "dwarvish"   |
| Elvish        | "elvish"     |
| Giant         | "giant"      |
| Gnomish       | "gnomish"    |
| Goblin        | "goblin"     |
| Infernal      | "infernal"   |
| Orc           | "orc"        |
| Primordial    | "primordial" |
| Sylvan        | "sylvan"     |
| Thieves Cant   | "thieves-cant"|
| Undercommon   | "undercommon"|

#### SKILLS

| Name               | Value            |
|--------------------|------------------|
| Acrobatics         | "acrobatics"     |
| Animal Handling     | "animal-handling"|
| Arcana             | "arcana"         |
| Athletics          | "athletics"      |
| Deception          | "deception"      |
| History            | "history"        |
| Insight            | "insight"        |
| Intimidation       | "intimidation"   |
| Investigation      | "investigation"  |
| Medicine           | "medicine"       |
| Nature             | "nature"         |
| Perception         | "perception"     |
| Performance        | "performance"    |
| Persuasion         | "persuasion"     |
| Religion           | "religion"       |
| Sleight of Hand      | "sleight-of-hand"|
| Stealth            | "stealth"        |
| Survival           | "survival"       |

#### SPEED_TYPES

| Name    | Value    |
|---------|----------|
| Walk    | "walk"   |
| Fly     | "fly"    |
| Swim    | "swim"   |
| Climb   | "climb"  |
| Burrow  | "burrow" |

#### TOOLS

| Name                | Value                |
|---------------------|----------------------|
| Alchemists Supplies   | "alchemists-supplies"|
| Brewers Supplies     | "breweres-supplies"  |
| Calligraphers Supplies| "calligraphers-supplies"|
| Carpenters Tools     | "carpenters-tools"   |
| Cartographers Tools  | "cartographers-tools"|
| Cooks Utensils       | "cooks-utensils"     |
| Glassblowers Tools   | "glassblowers-tools" |
| Jewelers Tools       | "jewelers-tools"     |
| Leatherworkers Tools | "leatherworkers-tools"|
| Masons Tools         | "masons-tools"       |
| Navigators Tools     | "navigators-tools"   |
| Poisoners Kit        | "poisoners-kit"      |
| Smiths Tools         | "smiths-tools"       |
| Thieves Tools        | "thieves-tools"      |
| Tinkers Tools        | "tinkers-tools"      |
| Weavers Tools        | "weavers-tools"      |
| Woodcarvers Tools    | "woodcarvers-tools"  |

#### WEAPON_TYPES

| Name    | Value  |
|---------|--------|
| Simple  | "simple"|
| Martial | "martial"|