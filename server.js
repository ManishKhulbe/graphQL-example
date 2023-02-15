const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require("axios");
const app = express();

/**
 * ID
 * String
 * Int
 * Float
 * Boolean
 * List []
 * custom object type
 *
 */

const schema = buildSchema(`

type Post{
    userId : Int 
    id : Int 
    title : String
    body : String
}

type User{
    name : String 
    age : Int
    college : String
} 


type Query {
hello : String! 
welcomeMessage (name:String , dayOfWeek : String!): String
getUser : User
getUsers : [User]
getPostFromExternalApi : [Post]
}

input UserInput{
    name : String!
    age : Int!
    college : String!
}

type Mutation {
    setMessage(newMessage : String) : String
    createUser (user : UserInput) : User
    }




`);
let message = "old message ";

const root = {
  hello: () => {
    return "hello world";
  },
  welcomeMessage: (args) => {
    return "hii " + args.name + args.dayOfWeek;
  },
  getUser: () => {
    const user = {
      name: "manish",
      age: 25,
      college: "IIt ",
    };
    return user;
  },
  getUsers: () => {
    const users = [
      {
        name: "manish",
        age: 25,
        college: "IIt ",
      },
      {
        name: "manish",
        age: 25,
        college: "IIt ",
      },
    ];

    return users;
  },
  getPostFromExternalApi: async () => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return result.data;
  },
  setMessage: ({ newMessage }) => {
    message = newMessage;
    return message;
  },
  createUser: (args) => {
    return args.user;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
