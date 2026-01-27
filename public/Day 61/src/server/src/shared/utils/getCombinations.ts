import { PrismaClient } from "@prisma/client";

const getCombinations = async (product: any, prisma: PrismaClient) => {
    const categoryId = product.categoryId;
    if (!categoryId) {
        console.warn(`Product ${product.id} has no categoryId, returning empty combinations`);
        return [];
    }

    // Get required attributes for the category
    const requiredAttributes = await prisma.categoryAttribute.findMany({
        where: { categoryId, isRequired: true },
        select: { attributeId: true },
    });
    const requiredAttributeIds = requiredAttributes.map(attr => attr.attributeId);
    console.log(`Product ${product.id} - Category ${categoryId} required attributes: ${requiredAttributeIds.join(', ')}`);

    if (!requiredAttributeIds.length) {
        console.warn(`Category ${categoryId} for product ${product.id} has no required attributes`);
        return [];
    }

    // Get all ProductAttribute records for the product
    const attributes = product.ProductAttribute || [];
    if (!attributes.length) {
        console.warn(`Product ${product.id} has no ProductAttribute records`);
        return [];
    }
    console.log(`Product ${product.id} - Found ${attributes.length} ProductAttribute records:`,
        attributes.map((attr: any) => ({ attributeId: attr.attributeId, valueId: attr.valueId, stock: attr.stock })));

    // Group attributes by attributeId
    const attributeMap = new Map<string, any[]>();
    requiredAttributeIds.forEach(attrId => {
        const attrs = attributes.filter((attr: any) => attr.attributeId === attrId);
        attributeMap.set(attrId, attrs);
    });

    // Log attributeMap contents
    console.log(`Product ${product.id} - attributeMap:`,
        Array.from(attributeMap.entries()).map(([attrId, attrs]) => ({
            attributeId: attrId,
            values: attrs.map((attr: any) => ({ valueId: attr.valueId, stock: attr.stock })),
        })));

    // Check if all required attributes have at least one value
    for (const attrId of requiredAttributeIds) {
        if (!attributeMap.get(attrId)?.length) {
            console.warn(`Product ${product.id} missing required attribute ${attrId}`);
            return [];
        }
    }

    // Generate combinations by iterating over all possible value combinations
    const combinations: { attributes: any[], stock: number }[] = [];
    const generateCombinations = (
        attrIds: string[],
        index: number,
        currentCombo: any[],
        seenCombos: Set<string>
    ) => {
        if (index === attrIds.length) {
            // Ensure combination has all required attributes
            if (currentCombo.length === attrIds.length) {
                const stock = Math.min(...currentCombo.map(attr => attr.stock || 0));
                if (stock > 0 && Number.isFinite(stock)) {
                    // Create a unique key for the combination
                    const comboKey = currentCombo
                        .map(attr => `${attr.attributeId}:${attr.valueId}`)
                        .sort()
                        .join('|');
                    if (!seenCombos.has(comboKey)) {
                        seenCombos.add(comboKey);
                        combinations.push({ attributes: [...currentCombo], stock });
                    }
                }
            }
            return;
        }

        const attrId = attrIds[index];
        const attrs = attributeMap.get(attrId) || [];
        if (!attrs.length) {
            return;
        }
        attrs.forEach(attr => {
            generateCombinations(attrIds, index + 1, [...currentCombo, attr], seenCombos);
        });
    };

    // Track seen combinations to avoid duplicates
    const seenCombos = new Set<string>();
    generateCombinations(requiredAttributeIds, 0, [], seenCombos);
    console.log(`Product ${product.id} generated ${combinations.length} combinations:`,
        combinations.map(combo => ({
            attributes: combo.attributes.map((attr: any) => ({
                attributeId: attr.attributeId,
                valueId: attr.valueId,
                stock: attr.stock,
            })),
            stock: combo.stock,
        })));

    return combinations;
};

export default getCombinations;