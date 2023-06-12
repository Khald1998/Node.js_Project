# Title
## Simple GraphQL Server with Express.js

# Background
This is a simple GraphQL server that is built with Express.js. The server provides basic CRUD operations (Create, Read, Update, and Delete) on a set of mock user data. GraphQL is used here because it allows clients to request for specific data as they need, rather than receiving a fixed structure from the server.

# Prerequisites
To run this server, you need to have the following:
- Node.js and npm installed.
- An understanding of JavaScript, Express.js and GraphQL.

# Inputs
This server defines the following inputs:
- `getAllUsers` - No input required, this returns all users from the data.
- `getUserById` - Requires an `id` (integer) as input to fetch a specific user.
- `addUser` - Requires `firstName` (string), `lastName` (string), `email` (string), and `password` (string) to create a new user.
- `deleteUser` - Requires an `id` (integer) to delete a specific user.
- `updateUser` - Requires an `id` (integer), and can take `firstName` (string), `lastName` (string), `email` (string), and `password` (string) to update a user.

# Outputs
This server defines the following outputs:
- `hello` - Returns a static string "Hello world!".
- `getAllUsers` - Returns a list of all users in the data.
- `getUserById` - Returns a specific user based on the given `id`, if exists.
- `addUser` - Adds a new user to the data and returns a confirmation string.
- `deleteUser` - Deletes a specific user based on the given `id`, if exists, and returns a confirmation string.
- `updateUser` - Updates a specific user based on the given `id`, if exists, and returns a confirmation string.

# Steps to Run
Follow these steps to run the server:
1. Clone this repository to your local machine.
2. Navigate to the cloned repository.
3. Install necessary npm packages by running `npm install express graphql express-graphql`.
4. Start the server by running `node app.js` (or the name of your main server file).
5. Visit `localhost:8080/graphql` in your web browser to interact with the server through GraphiQL, an in-browser IDE for exploring GraphQL. 
6. Visit `localhost:8080` to view the basic home page served by Express.

```
{
  hello
}
```

```
{
  getAllUsers {
    id
    firstName
    lastName
    email
    password
  }
}
```

```
{
  getUserById(id: 1) {
    id
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
  deleteUser(id: 1) 
}
```

```
mutation {
  updateUser(id: 1, firstName: "Updated", lastName: "User") 
}

```
