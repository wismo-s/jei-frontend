import type { DefaultOptionType } from "antd/es/select";
import { formatDayJsDate, isValidDateRange, isValidDayJsDate } from "./dayjs-helpers";

/**
 * @description Parses a filter object to mutate search params
 */
export function parseFilterToRecord<T extends object>(
    changedValue: T,
): Record<string, string | null> {
    const newParams: Record<string, string | null> = {};

    if (Object.keys(changedValue).length === 0) return newParams;

    // Procesar todos los entries, no solo el primero
    Object.entries(changedValue).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
            newParams[key] = null;
            newParams[`${key}After`] = null;
            newParams[`${key}Before`] = null;
            return;
        }

        // date range or multiple choice
        if (Array.isArray(value)) {
            if (isValidDateRange(value)) {
                newParams[`${key}After`] = formatDayJsDate(value[0]);
                newParams[`${key}Before`] = formatDayJsDate(value[1]);
            } else {
                newParams[key] = value.join(",");
            }
            // single date
        } else if (isValidDayJsDate(value)) {
            newParams[key] = formatDayJsDate(value);
            // other single values
        } else {
            newParams[key] = value;
        }
    });

    return newParams;
}

// Only for filter select options
export const getOptionsFromEnum = (
    enumObj: Record<string, string>,
): DefaultOptionType[] => {
    return Object.entries(enumObj).map(
        ([key, value]) =>
            ({
                value: key,
                label: value,
            }) as DefaultOptionType,
    );
};
