<div id = "readme-top"></div>

# Savor (LAHacks 2024)

### Savor is an AI recipe-generating app, leveraging the use of Gemini AI, Firebase, and React Native to build an application that promotes eco-friendliness and prevent food waste anywhere, anytime.

## Documentation

- <a href="#Showcase">Showcase</a>
- <a href="#built-with">Built With</a>
- <a href="#server">Starting Server</a>
- <a href="#Authentication">Authentication & Users</a>
- <a href="#frontend">Frontend</a>
- <a href="#backend">Backend</a>

<div id="Showcase"></div>

## Showcase

https://github.com/developersbm/Savor/assets/122469079/71b02d5c-369b-4461-8542-c94f4a22d298

<div id="built-with"></div>

## Built With

- ![React Native](https://img.shields.io/badge/React_Native-blue?logo=react&logoColor=white&style=flat-square)
- ![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js&logoColor=white&style=flat-square)
- ![HTML](https://img.shields.io/badge/HTML-orange?logo=html5&logoColor=white&style=flat-square)
- ![CSS](https://img.shields.io/badge/CSS-blue?logo=css3&logoColor=white&style=flat-square)
- ![Express.js](https://img.shields.io/badge/Express.js-gray?logo=express&logoColor=white&style=flat-square)
- ![Firebase](https://img.shields.io/badge/Firebase-yellow?logo=firebase&logoColor=white&style=flat-square)
- ![Gemini AI](https://img.shields.io/badge/Gemini_AI-purple?style=flat-square&logoWidth=40)
- ![Google Cloud Natural Language](https://img.shields.io/badge/Google_Cloud_Natural_Language-blue?logo=google-cloud&logoColor=white&style=flat-square)

<p align="right">(<a href="#readme-top">Back to top</a>)</p>

<div id="server"></div>

## Starting Server

### Express and Expo Setup

- Allow access to the Backend

```
cd server
node app.js
```

- Allow access to the frontend

```
cd frontend
npx expo start
```

<p align="right">(<a href="#readme-top">Back to top</a>)</p>

<div id="Authentication"></div>

## Authentication & Users

### Firebase Authentication Overview

#### Firebase Authentication provided us a straightfoward and secure way to authenticate users for their credentials and managing their user identities. Our application supports Email/Password Sign-In, providing users a familiar, convenient, and safe way to access our application.

- Initialization by setting up Firebase Authentication; Setting up necessary dependencies.
- User Registration allows users to create their own accounts which is handled by Firebase in the backend process, securing and managing credentials.
- User Sign-in grants users the ability to access their accounts with their credentials whilst Firebase verifies their identity and authenticates them.
- Access Control utilizes Firebase Authentication to enforce access and resource control within our application.

<p align="right">(<a href="#readme-top">Back to top</a>)</p>

<div id="frontend"></div>

## Frontend Overview (Expo & Gemini AI)

### Utilized Expo to simulate the User experience with our application and designed around the idea of a mobile application through React Native. Additionally, we brought out Gemini's full potential by using its insane data gathering capability to retrieve and track a multitude of item qualities:

- Calories
- Location
- Category

### Through Gemini we are also able to use our User Item database to generate unique step-by-step recipes in order to prevent Food Waste.

<p align="right">(<a href="#readme-top">Back to top</a>)</p>

<div id="backend"></div>

## Backend Overview (Node.js)

### The Backend relied on Express.js to communicate with our Firebase Database which stored our Users and their respective items. Through this process, we are able to produce API endpoints that manipulate and transform the data processed within Firebase to eventually be used by Google's Gemini AI.

### Express Route Handlers:

#### Adding Data to Database (HTTP POST)

- Parameters (request, response)
- Destructure title, calories, category, expiration, location, image from req.body
- Accesses User Database for list of items
- Checks for the existance of item in User Database, and creates or updates depending on status.

#### Deleting Data from Database (HTTP DELETE)

- Parameters (request, response)
- Implement Try & Catch for erros:
  - If itemTitle does not exist in User Database: throw error
  - If it does exist then deletion is followed through

#### Fetching Data from Database (HTTP GET)

- Parameters (request, response)
- Grab all items from User Database, including item qualities, and return them in an Array of json.
- Alternatively grab just an Array of strings for item titles.

<p align="right">(<a href="#readme-top">Back to top</a>)</p>
