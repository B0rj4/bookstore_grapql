import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
} from "graphql";

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This is author that can write books",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export { AuthorType };
