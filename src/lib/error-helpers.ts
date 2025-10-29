export function extractErrorMessages(obj: object, result: object[] = []): object[] {
    if (obj === null || obj === undefined) return result;

    if (typeof obj === "object") {
        if (Array.isArray(obj)) {
            // Si es array, procesar cada elemento
            obj.forEach((item) => extractErrorMessages(item, result));
        } else {
            // Si es objeto, procesar cada valor
            Object.values(obj).forEach((value) => extractErrorMessages(value, result));
        }
    } else {
        // Si es primitivo, agregarlo al resultado
        result.push(obj);
    }

    return result;
}
