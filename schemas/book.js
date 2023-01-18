import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
} from "graphql";
import { AUTHORS } from "../temporalDb.js";
import { AuthorType } from "./author.js";

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This is representations of a book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return AUTHORS.find((author) => author.id === book.authorId);
      },
    },
  }),
});

export { BookType };
