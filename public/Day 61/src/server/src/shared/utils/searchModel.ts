import mapTransactionStatus from "./mapTransactionsStatus";

/**
 * Generic search function to query any model in Prisma dynamically.
 *
 * Params:
 * - model: the name of the Prisma model (e.g., "product", "user")
 * - fields: array of field definitions to search by; includes:
 *    - name: field name
 *    - isString: whether this field is a string (can use `contains`) or not
 * - searchQuery: the user's search input
 * - prisma: Prisma client instance
 *
 * Returns:
 * - Array of matching records with only the selected fields and `id`
 */
const searchModel = async (
  model: string,
  fields: { name: string; isString: boolean }[],
  searchQuery: string,
  prisma: any
) => {
  return await prisma[model].findMany({
    where: {
      OR: fields
        .map(({ name, isString }) => {
          if (isString) {
            // For string fields, use "contains" with case-insensitive search
            return {
              [name]: { contains: searchQuery, mode: "insensitive" },
            };
          } else {
            // For non-string fields (like enums), define custom handling
            if (model === "transaction" && name === "status") {
              const validStatuses = mapTransactionStatus(searchQuery);
              return {
                [name]: { in: validStatuses }, // Enum filtering
              };
            }

            return {}; // Skip unsupported non-string fields
          }
        })
        .filter((condition) => Object.keys(condition).length > 0), // Remove empty search objects
    },
    select: {
      id: true,
      // Dynamically include all provided fields in the result
      ...fields.reduce((acc: any, { name }) => {
        acc[name] = true;
        return acc;
      }, {}),
    },
  });
};

export default searchModel;
