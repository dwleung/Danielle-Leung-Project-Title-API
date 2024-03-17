# ideally API

## Overview

"ideally" is an idea generator to inspire software engineering projects, providing random or custom project ideas and a starter pack including a project descriptions, and project requirements. The ideally API serves as a backend that connects to OpenAI API to generate ideas, and a MySQL database to store user information.

### Features

**Generate idea:** Take user inputs of interests and skills to generate a custom idea with a title, description, and requirements. If the user provides no input, generates a random idea.

**User profile:** User login with JWT auth

**Save idea:** Authorized user saves desirable ideas to database with user_id

**View idea:** Authorized user retrieves saved ideas to view details

### Tech Stack

Libraries:

-    axios 1.6.7
-    knex v3.1.0
-    express v4.18.2
-    jsonwebtoken v9.0.2
-    openai v4.26.0

## Implementation

### APIs

**Open AI API**
model: gpt-3.5-turbo-0125

### Sitemap

├── controllers
| ├── user-controller.js
├── middleware
| ├── authorize.js
├── routes
| ├── openai_routes.js
| ├── user_routes.js
├── knexfile.js
├── server.js
└── README.md

### Data

The ideas generated will not be stored unless the user logs in and saves them.

_USER TABLE_ stores username & password

_IDEAS TABLE_ stores project title, description, requirements. Columns for seed data and mockup image included for future feature addition.

_PROMPTS TABLE_ stores user inputs of interests and skills used to generate custom ideas, a future feature.

![Three sample tables showing users, ideas, and prompts](./src/assets/database-tables.png)

### Endpoints

**POST /openai**

Send a post request to openAI API with chat history.
Adds sytem role to the chat history to generate appropriate responses.

     Response:
     ```
     {
          "title": "Project Title",
          "description": "Build a website that generates software engineering project briefs for software engineering students",
          "requirements": [
               0: "Generate new idea when button is pressed",
               1: "Use an API"
               2: "Create a database with ideas"
          ]
     }
     ```

**POST /user/signup**

Add a user account

     Parameters:
     - username: User's username
     - password: User's provided password

     Response:

     ```
     {
          "id": 1,
          "name": "dani",
          "username": "danidani",
               "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.
               eyJ2ZXJzaW9uIjoxNiwibmFtZSI6IkRhbmllbGxlIExldW..."
     }
     ```

**POST /user/login**

Login a user

     Parameters:
     - username: User's username,
     - password: user's password

     Response:

     ```
     {
          "token":
               "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.
               eyJ2ZXJzaW9uIjoxNiwibmFtZSI6IkRhbmllbGxlIExldW..."
     }
     ```

**POST /user/ideas**

Add idea to database

     Parameters:
     token: JWT of logged in user
     idea: Idea that user wants to save

     Response:
     ```
     {
          "id": 1,
          "idea": "Some idea that is just magnificent"
     }
     ```

### Auth

JSON Web Tokens used for auth for any requests to the database.
