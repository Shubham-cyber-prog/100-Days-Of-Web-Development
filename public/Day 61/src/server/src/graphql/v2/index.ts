import { ApolloServer } from "@apollo/server";
import { combinedSchemas } from "../v1/schema";

export const serverV2 = new ApolloServer({
  schema: combinedSchemas,
  introspection: process.env.NODE_ENV !== "production",
  includeStacktraceInErrorResponses: process.env.NODE_ENV !== "production",
});
