const express = require("express");
const { graphql, buildSchema } = require("graphql")
const { graphqlHTTP } = require("express-graphql")
const userData = require('./MOCK_DATA.json')

const app = express();
const PORT = 8080;


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type User {
        id: ID
        firstName: String
        lastName: String
        email: String
        password: String
    }

    type Query {
        hello: String
        getAllUsers: [User]
        getUserById(id: Int!): User
    }

    type Mutation {
        deleteUser(id: Int!): String
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): String
        updateUser(id: Int!, firstName: String, lastName: String, email: String, password: String): String
    }
`)

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return "Hello world!"
    },
    getAllUsers: () => {
        return userData;
    },
    getUserById: ({ id }) => {
        const user = userData.find((user) => user.id === id);
        return user;
    },
    addUser: ({ firstName, lastName, email, password }) => {
        const id = userData.length+1; 
        const newUser = { id, firstName, lastName, email, password };
        userData.push(newUser);
        return `User ${firstName} was added`;
    },
    deleteUser: ({ id }) => {
        const user = userData.find((user) => user.id === id);
        if (user == null) {
            return `User with id ${id} does not exist`;
        }
        const userIndex = userData.findIndex((user) => user.id === id);
        userData.splice(userIndex,1)
        return `User with id ${id} was deleted`;
        
    },
    updateUser: ({ id, firstName, lastName, email, password }) => {
        const data = userData.find((user) => user.id === id);
        if (data == null) {
            return `User with id ${id} does not exist`;
        }
        const userIndex = userData.findIndex((user) => user.id === id);
        const user = userData[userIndex];
        userData[userIndex] = {
            ...user,
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            email: email || user.email,
            password: password || user.password,
        };
        return `User with id ${id} was updated`;

    },

}

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
})
)

app.get("/", function (req, res) {
    res.send(`This is home`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});