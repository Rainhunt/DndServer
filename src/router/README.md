# API Endpoint Documentation

This document provides details on the available API endpoints for the application.

## Authentication

Most authenticated routes require a JSON Web Token (JWT) to be passed in the `Authorization` header as a Bearer token:

`Authorization: Bearer <YOUR_JWT_TOKEN>`

Tokens are obtained via the `/users/login` or `/users/signup` endpoints.

---

## User Endpoints

Base path: `/users`

### 1. User Signup

*   **Endpoint:** `POST /signup`
*   **Description:** Registers a new user and returns a JWT upon successful registration.
*   **Request Body:**
    ```json
    {
        "name": "string (required)",
        "email": "string (required, valid email format)",
        "password": "string (required, min 8 characters)"
    }
    ```
*   **Responses:**
    *   `200 OK`: Signup successful.
        ```json
        {
            "token": "string (JWT)"
        }
        ```
    *   `400 Bad Request`: Validation error (e.g., invalid email, password too short, missing fields).
        ```json
        {
            "error": "string (description of the error)"
        }
        ```
    *   `409 Conflict`: User with the given email already exists.
        ```json
        {
            "error": "Email already exists"
        }
        ```
    *   `500 Internal Server Error`: Server-side error.
*   **Authorization:** None required.

### 2. User Login

*   **Endpoint:** `POST /login`
*   **Description:** Authenticates an existing user and returns a JWT.
*   **Request Body:**
    ```json
    {
        "email": "string (required)",
        "password": "string (required)"
    }
    ```
*   **Responses:**
    *   `200 OK`: Login successful.
        ```json
        {
            "token": "string (JWT)"
        }
        ```
    *   `400 Bad Request`: Missing email or password.
    *   `401 Unauthorized`: Invalid credentials.
        ```json
        {
            "error": "Invalid email or password"
        }
        ```
    *   `500 Internal Server Error`: Server-side error.
*   **Authorization:** None required.

---

## Game Endpoints

Base path: `/games`

### 1. Get My Games

*   **Endpoint:** `GET /my-games`
*   **Description:** Retrieves a list of game IDs associated with the authenticated user.
*   **Request Body:** None.
*   **Responses:**
    *   `200 OK`: Successfully retrieved game IDs.
        ```json
        {
            "gameIds": ["string (gameId)", "string (gameId)"]
        }
        ```
    *   `401 Unauthorized`: If the user is not authenticated.
    *   `404 Not Found`: If the authenticated user document is not found (should be rare).
    *   `500 Internal Server Error`: Server-side error.
*   **Authorization:** JWT Bearer token required.

### 2. Get Game Details (List of Maps)

*   **Endpoint:** `GET /games/:id`
*   **Description:** Retrieves details for a specific game, including a list of its maps (ID and name). The user must have access to the game.
*   **URL Parameters:**
    *   `id` (string, required): The ID of the game to retrieve.
*   **Request Body:** None.
*   **Responses:**
    *   `200 OK`: Successfully retrieved game details.
        ```json
        {
            "maps": [
                { "_id": "string (mapId)", "name": "string (mapName)" },
                // ... more maps
            ]
        }
        ```
        (Note: The actual game object might contain more fields, but `maps` is the key part for this feature).
    *   `401 Unauthorized`: If the user is not authenticated.
    *   `403 Forbidden`: If the user does not have access to the requested game.
    *   `404 Not Found`: If the game with the specified ID is not found.
    *   `500 Internal Server Error`: Server-side error.
*   **Authorization:** JWT Bearer token required.

### 3. Get Map XML Data

*   **Endpoint:** `GET /map/:id`
*   **Description:** Retrieves the TMX XML data for a specific map. The user must be a Game DM for the game containing the map or the map must have been revealed to them.
*   **URL Parameters:**
    *   `id` (string, required): The ID of the map to retrieve.
*   **Request Body:** None.
*   **Responses:**
    *   `200 OK`: Successfully retrieved map XML.
        ```json
        {
            "xml": "string (TMX XML content)"
        }
        ```
    *   `401 Unauthorized`: If the user is not authenticated.
    *   `403 Forbidden`: If the user does not have access to the requested map.
    *   `404 Not Found`: If the map or its associated game is not found.
    *   `500 Internal Server Error`: Server-side error.
*   **Authorization:** JWT Bearer token required.

---
