# README

## Title
GraphQL API for User Management System with MongoDB

## Background
This project is a simple Node.js application built using Express.js, Mongoose, and GraphQL. It provides an API for a basic user management system where users can be added, fetched, updated, and deleted from a MongoDB database. The API is implemented using GraphQL which provides a more efficient and flexible approach compared to traditional REST APIs.

## Prerequisites
1. Node.js - You can download it from [here](https://nodejs.org/).
2. MongoDB - You can download it from [here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas.
3. NPM or Yarn - NPM is distributed with Node.js which means that when you download Node.js, you automatically get NPM installed on your computer.

## Inputs
1. For adding a user (`addUser` mutation): The `firstName`, `lastName`, `email`, and `password` fields are required.
2. For updating a user (`updateUser` mutation): The `_id` field is required and any of the other fields (`order`, `firstName`, `lastName`, `email`, `password`) can be updated.
3. For deleting a user (`deleteUser` mutation): The `_id` field is required.
4. For getting a user by ID (`getUserById` query): The `_id` field is required.
5. For getting a user by order (`getUserByOrder` query): The `order` field is required.

## Outputs
1. For adding a user: Returns a string message indicating that the user was added or an error message if there was a problem.
2. For updating a user: Returns a string message indicating that the user was updated or an error message if there was a problem.
3. For deleting a user: Returns a string message indicating that the user was deleted or an error message if there was a problem.
4. For getting a user by ID: Returns the user object or a "Person Not Found" message if the user does not exist.
5. For getting a user by order: Returns the user object or null if the user does not exist.
6. For getting all users (`getAllUsers` query): Returns an array of all users in the database or an empty array if there are no users.

## Steps to Run
1. Clone this repository or download the code to your local machine.
2. Install the required packages by running `npm install` or `yarn install` in the root directory of the project.
3. Add your MongoDB connection string to a `.env` file in the root directory of the project, like so: `DB=your_mongoDB_connection_string`.
4. Run the server using `node app.js` or `npm start` or `yarn start` command.
5. The server will start running at `http://localhost:8080/`.
6. Visit `http://localhost:8080/graphql` in your browser to interact with the GraphQL API using the GraphiQL interface. You can send queries and mutations to the API from here.

```
{
  hello
}
```

```
{
  getAllUsers {
    order
    firstName
    lastName
    email
    password
  }
}
```

```
{
  getUserById(_id: "64873a63b2d93269fbff5c96") {
    order
    firstName
    lastName
    email
    password
  }
}
```

```
{
  getUserByOrder(order: 1) {
		order
    firstName
    lastName
    email
    password
  }
}
```

```
mutation {
  addUser(firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password") 
}
```

```
mutation {
  deleteUser(_id: "64873a63b2d93269fbff5c96") 
}
```

```
mutation {
  updateUser(_id: "64873a63b2d93269fbff5c96", order:69 ,firstName: "Updated", lastName: "User") 
}

```
