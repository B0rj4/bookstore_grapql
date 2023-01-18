import express from "express";
import { GraphQLSchema, GraphQLList, GraphQLObjectType } from "graphql";

import { BookType } from "./schemas/book.js";
import { AuthorType } from "./schemas/author.js";
import { AUTHORS, BOOKS } from "./temporalDb.js";
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
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of books",
      resolve: () => AUTHORS,
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
