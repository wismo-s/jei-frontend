type DetectChangesArgs<T, Q> = {
    data: T | undefined;
    values: Q extends Partial<T> ? Q : T;
    fieldsToCompare: (keyof T)[];
};

/**
 * Detects if there are changes between the original data and the form values
 * @param options Object containing the original data, form values, and fields to compare
 * @returns Boolean indicating if there are changes
 */
export const detectChanges = <T, Q>({
    data,
    values,
    fieldsToCompare,
}: DetectChangesArgs<T, Q>): boolean => {
    if (!data) return true;

    return fieldsToCompare.some((field) => {
        const originalValue = data[field];
        const newValue = values[field];

        // Handle arrays
        if (Array.isArray(originalValue) && Array.isArray(newValue)) {
            if (originalValue.length !== newValue.length) return true;
            return originalValue.some((val, index) => val !== newValue[index]);
        }

        // Handle objects
        if (
            typeof originalValue === "object" &&
            originalValue !== null &&
            typeof newValue === "object" &&
            newValue !== null &&
            !Array.isArray(originalValue) &&
            !Array.isArray(newValue)
        ) {
            return JSON.stringify(originalValue) !== JSON.stringify(newValue);
        }

        // Handle primitive values
        return originalValue !== newValue;
    });
};
