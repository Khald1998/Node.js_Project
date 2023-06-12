const express = require("express");
const mongoose = require('mongoose');
const { graphql, buildSchema } = require("graphql")
const { graphqlHTTP } = require("express-graphql")
const User = require('./models/User');
require('dotenv').config();

const app = express();
const PORT = 8080;

const url = process.env.DB + 'UserDB' || 'mongodb://127.0.0.1:27017/UserDB';

mongoose.connect(url)
    .then(() => console.log('Server is connected to MongoDB'))
    .catch((err) => console.log(err));





// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type User {
        order: Int
        firstName: String
        lastName: String
        email: String
        password: String
    }

    type Query {
        hello: String
        getAllUsers: [User] 
        getUserByOrder(order: Int!): User
        getUserById(_id: ID!): User
    }

    type Mutation {
        deleteUser(_id: ID!): String
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): String
        updateUser(_id: ID!,order: Int, firstName: String, lastName: String, email: String, password: String): String
    }
`)





// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return `Hello world!`
    },
    getAllUsers: async () => {
        try {
            const users = await User.find({});
            console.log(users.length)
            if (users.length === 0) {
                return [];
            } else {
                return users;
            }
        } catch (err) {
            console.error(err); // Log the error for debugging purposes.
            throw new Error('Failed to fetch users.'); // Throw an error to handle the exception.    
        }
    },
    
    getUserById: async({ _id }) => {
        try {
            const user = await User.findOne({_id:_id});
            if (!user) {
                return"Person Not Found";
              } else {
                return user;
              }
        } catch (err) {
            console.error(err); // Log the error for debugging purposes.
            throw new Error('Failed to fetch users.'); // Throw an error to handle the exception.    
        }
    },
    getUserByOrder: async({ order }) => {
        try {
            const user = await User.findOne({order:order});
            
            if (!user) {
                return null;
              } else {
                return user;
              }
        } catch (err) {
            console.error(err); // Log the error for debugging purposes.
            throw new Error('Failed to fetch users.'); // Throw an error to handle the exception.    
        }
    },

    addUser: async ({ firstName, lastName, email, password }) =>  {
        try {
            const count = await User.countDocuments({});
            const order = count + 1;
            const newUser = new User({
                order:order,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });
            // Create a new document and save it to the collection
            await newUser.save()
            return `User ${firstName} was added`;
        } catch (error) {
            console.error(error);
            return (error.code=11000)?`User ${firstName} already exist`:'There was a problem adding the user';
        }
    },
    deleteUser: async({ _id }) => {
        try {
            const user = await User.exists({_id:_id});
            if (!user) {
                return`Can not delete ${_id} because it already deleted!`;
              }else{
                await User.deleteOne({_id:_id})
                return`${_id} was deleted!`;
              }
          
        } catch (error) {
            console.error(err); // Log the error for debugging purposes.
            throw new Error('Failed to fetch users.'); // Throw an error to handle the exception.    
        }

    },
    updateUser: async({ _id, order, firstName, lastName, email, password }) => {
        try {
            const user = await User.exists({_id:_id});
            if (!user) {
                return`Can not delete ${_id} because it already deleted!`;
              }else{
                const user = await User.findOne({_id:_id});
                const orderNew = order || user.order
                const firstNameNew = firstName || user.firstName
                const lastNameNew = lastName || user.lastName
                const emailNew = email || user.email
                const passwordNew = password || user.password
                await User.updateOne({_id:_id}, { order: orderNew, firstName: firstNameNew , lastName: lastNameNew , email: emailNew , password: passwordNew })
                return`${_id} was updated!`;
              }
        } catch (err) {
            console.error(err); // Log the error for debugging purposes.
            throw new Error('Failed to fetch users.'); // Throw an error to handle the exception.    

        }

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