# WeatherAPI

## Project Overview

WeatherAPI is a backend project that integrates a third-party weather service to provide real-time weather data. Access to weather information is restricted based on user authentication, ensuring users can only view weather data for their registered country.

---

## Project Setup

This project is built using Node.js, Express, and MongoDB. It follows a modular structure with separate models, middleware, and integrations for better maintainability and scalability.

---

## Data Models

### Weather Model

Stores weather data fetched from the external WeatherAPI service and associates it with a specific user.

| Field     | Type     | Description                                 |
| --------- | -------- | ------------------------------------------- |
| userId    | ObjectId | Reference to the User collection            |
| name      | String   | Location or city name                       |
| country   | String   | Country of the location                     |
| localtime | String   | Local date and time                         |
| temp_f    | Number   | Temperature in Fahrenheit                   |
| condition | Object   | Weather condition details                   |
| └─ text   | String   | Condition description (e.g., Partly cloudy) |
| humidity  | Number   | Humidity percentage                         |

---

### User Model

Stores user credentials and profile information.

| Field    | Type   | Description               |
| -------- | ------ | ------------------------- |
| name     | String | User’s full name          |
| email    | String | Unique user email         |
| password | String | Hashed password           |
| country  | String | User’s registered country |

---

## Authentication & Authorization

- Authentication is implemented using an Auth middleware.
- Only authenticated users can access weather data.
- Authorization ensures users can only retrieve weather data that matches their registered country.
- Attempts to access weather data from other countries are blocked.

---

## Integration Flow

1. User registers and logs in.
2. Auth middleware validates the user’s identity.
3. Weather data is fetched or retrieved based on the user’s country.
4. The system returns weather data only if it matches the authenticated user’s country.

---

## Security Notes

- Passwords are stored using hashing.
- Protected routes require valid authentication tokens.
- Data access is filtered by user ownership and country.

---

## Future Improvements

- Support for temperature units (Celsius/Fahrenheit)
- Caching weather responses
- Role-based access control
- Multi-location support per user

---
