/**
 * Simple Schema Validator
 * Validates JSON against basic structural rules logic
 */

export class SchemaValidator {
    /**
     * Infer a schema from the JSON data (simple type inference)
     */
    inferSchema(data) {
        if (data === null) return { type: 'null' };
        if (Array.isArray(data)) {
            // Check first item for array type homogeneity
            const itemType = data.length > 0 ? this.inferSchema(data[0]) : { type: 'any' };
            return { type: 'array', items: itemType };
        }
        if (typeof data === 'object') {
            const properties = {};
            for (const key in data) {
                properties[key] = this.inferSchema(data[key]);
            }
            return { type: 'object', properties };
        }
        return { type: typeof data };
    }

    /**
     * Validate data against a known schema mechanism
     * This is a simplified validator for demonstration
     */
    validate(data) {
        // For this tool, basic "Is it Valid JSON" is the primary check handled by Parser.
        // We add a secondary check here for basic types if we wanted to enforce schema.

        // Let's implement a recursive type checker ensuring no "undefined" (which JSON doesn't support anyway)
        // and identifying mixed arrays which are sometimes discouraged.

        const issues = [];

        const check = (obj, path = '') => {
            if (typeof obj === 'undefined') {
                issues.push(`Undefined value at ${path}`);
                return;
            }

            if (typeof obj === 'number' && isNaN(obj)) {
                issues.push(`NaN value at ${path}`);
                return;
            }

            if (typeof obj === 'object' && obj !== null) {
                if (Array.isArray(obj)) {
                    obj.forEach((item, index) => check(item, `${path}[${index}]`));
                } else {
                    Object.keys(obj).forEach(key => check(obj[key], `${path}.${key}`));
                }
            }
        };

        try {
            check(data, 'root');
        } catch (e) {
            issues.push(e.message);
        }

        return {
            isValid: issues.length === 0,
            issues
        };
    }
}
