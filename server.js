import express from "express";
import { GraphQLSchema, GraphQLList, GraphQLObjectType } from "graphql";
// const { AuthorType } = require("./schemas/author");

import { BookType } from "./schemas/book.js";
import { BOOKS } from "./temporalDb.js";
import { graphqlHTTP as expressGraphQL } from "express-graphql";
const app = express();

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "List of books",
      resolve: () => BOOKS,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("Server Running"));
