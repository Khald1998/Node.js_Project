# README

## Title: Simple Express.js and Mongoose Web Service

## Background
This application is a simple Express.js and Mongoose web service, designed to interface with a MongoDB database. It provides basic CRUD (Create, Read, Update, Delete) operations for 'Person' records in the database.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- You have a working installation of Node.js and npm (Node Package Manager).
- You have installed the necessary npm packages, which are:
  - express
  - mongoose
  - body-parser
  - dotenv
- You have a MongoDB instance running, either locally or as a remote service. The URL for this service should be set as an environment variable `MONGO_URL` or left as the default 'mongodb://127.0.0.1:27017/testdb'.

## Inputs
The application accepts HTTP GET, POST, PUT, and DELETE requests with the following paths:

- `/`: Responds with "Home".
- `/findAll`: Fetches all Person documents from the database.
- `/find`: Searches for a single Person document based on the provided 'name' in the request body.
- `/add`: Adds a new Person document to the database based on the provided 'name' in the request body.
- `/delete`: Deletes the Person document with the provided 'name' in the request body.
- `/update`: Updates the 'age' and 'email' fields of the Person document with the provided 'name' in the request body.

## Outputs
The application returns HTTP responses based on the request received:

- For the `/findAll` path, it returns an array of all Person documents.
- For the `/find` path, it returns the Person document that matches the provided 'name', if it exists.
- For the `/add` path, it confirms the addition of the new Person document, or indicates if the person already exists.
- For the `/delete` path, it confirms the deletion of the Person document, or indicates if the person doesn't exist.
- For the `/update` path, it confirms the update of the Person document, or indicates if the person doesn't exist.

## Steps to Run
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.
4. If you are running a local MongoDB instance, ensure it is running. If you are using a remote MongoDB service, set your connection string as the `MONGO_URL` environment variable in a .env file.
5. Run `node app.js` to start the server.
6. The server will start running and listen for requests on port 8080. You can change this port by updating the `port` constant in the `app.js` file.
7. Use a tool like Postman or CURL to send requests to `localhost:8080` (or your specified port) to interact with the API.
