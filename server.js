import express from "express";
import {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

import { BookType } from "./schemas/book.js";
import { AuthorType } from "./schemas/author.js";
import { AUTHORS, BOOKS } from "./temporalDb.js";
import { graphqlHTTP as expressGraphQL } from "express-graphql";
const app = express();

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: BookType,
      description: "Single Book",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => BOOKS.find((book) => book.id === args.id),
    },
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
    author: {
      type: AuthorType,
      description: "Single Author",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        AUTHORS.find((author) => author.id === args.id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Muration",
  description: "Change things",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add one Book",
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        authorId: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (parent, args) => {
        const book = {
          id: BOOKS.length + 1,
          name: args.name,
          authorId: args.authorId,
        };

        BOOKS.push(book);

        return book;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("Server Running"));
