import gql from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { productResolvers } from "@/modules/product/graphql/resolver";

const typeDefs = gql`
  type transaction {
    id: String!
    orderId: String!
    status: String!
  }

  type Order {
    id: String!
    amount: Int!
    userId: Int!
  }

  type Review {
    id: String!
    rating: Float!
    comment: String
  }

  type Query {
    transactions: [Product!]
    transaction(slug: String!): Product
  }
`;

export const transactionSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: productResolvers,
});
