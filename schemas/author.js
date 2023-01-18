import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";
import { BOOKS } from "../temporalDb.js";
import { BookType } from "./book.js";

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This is author that can write books",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return BOOKS.filter((book) => book.authorId === author.id);
      },
    },
  }),
});

export { AuthorType };
