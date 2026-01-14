import { analyticsSchema } from "@/modules/analytics/graphql/schema";
import { productSchema } from "@/modules/product/graphql/schema";
import { mergeSchemas } from "@graphql-tools/schema";

export const combinedSchemas = mergeSchemas({
  schemas: [analyticsSchema, productSchema],
});
