import { ApolloServer } from "@apollo/server";
import { combinedSchemas } from "./schema";

export const serverV1 = new ApolloServer({
  schema: combinedSchemas,
  introspection: process.env.NODE_ENV !== "production",
  includeStacktraceInErrorResponses: process.env.NODE_ENV !== "production",
});
