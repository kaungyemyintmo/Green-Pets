## Backend Web Development CA1 Project 

This is the interface of a game related to sustainability. In the program, the client is to perform tasks and take trivia quizzes to gain points, which are used to adopt pets. After which, client plays the game in the role of the pet, where the pet can perform sustainable duties, gain energies and climb up the leaderboard. Moreover, the client can create messages and read others' messages as well. The purpose of the game is for users to do tasks that help the environment as well as be educated on sustainable living by taking trivia quizzes, all while role playing as a pet to enhance the enjoyment. 

## IMPORTANT NOTE 

## Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)

### github 

## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/ST0503-BED/bed-ca2-kaungyemyintmo.git`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Setting Up Environment Variables

This repository provides instructions for setting up environment variables using a `.env` file in an Express.js application. The environment variables will be used in the `db.js` file located in the `src/services` directory.

## Set up 

1. Create the `.env` file. 
2. Open the `.env` file and add the following lines:

   ```
   DB_HOST=<your_database_host>
   DB_USER=<your_database_user>
   DB_PASSWORD=<your_database_password>
   DB_DATABASE=<your_database_name>
   JWT_SECRET_KEY=<your_secret_key>
   JWT_EXPIRES_IN=<duration>
   JWT_ALGORITHM=<selected_algorithm>
   JWT_ADMIN_KEY=<your_preferred_safe_key>
   ```

   Replace `<your_database_host>`, `<your_database_user>`, `<your_database_password>`, and `<your_database_name>` with the appropriate values for your database connection.

   
   Replace `<your_secret_key>`, `<duration>`, and `<selected_algorithm>` with the appropriate values for your JSON web token usage.

   Replace `<your_preferred_safe_key>` with your preferred key to authenticate admin users to unlock admin privileges.

   For example:

   ```
   DB_HOST=localhost
   DB_USER=myuser
   DB_PASSWORD=mypassword
   DB_DATABASE=mydb

   JWT_SECRET_KEY=your-secret-key
   JWT_EXPIRES_IN=1h
   JWT_ALGORITHM=HS256
   JWT_ADMIN_KEY=soc
   ```

   Note: Make sure there are no spaces around the equal sign (=) in each line.

3. Save the .env file. 
## Dependencies

Before running the program, execute the following command in the terminal to install the dependencies. 

- npm install - to install the required dependencies using npm

## Running 

To run the program, execute the following command in the terminal. 

npm run init_tables - to initialize the database tables
npm start - to start the program 

To access the web page, go to `http://localhost:3000/index.html` in your preferred browser. 

## Backend

### Cases
The cases cover different aspects of the Express.js API, including the following:

- GET routes
- POST routes
- PUT routes
- DELETE routes
- Validating requests
- Verifying data
- Sending appropriate status code 
- Performing basic read operations on the database

Each case in different routes make HTTP requests to the respective API routes and validate the responses against expected values.

## Frontend 

The files under 'public' directory cover appropriate frontend interface after retrieving data from the backend. The web pages utilizie bootstrap version 5 to cater to different device dimensions. 

### Libraries 

The web pages utilize 'Animate On Scroll (AOS)' and 'jQuery' libraries to enhance the dynamic part of the program.

 