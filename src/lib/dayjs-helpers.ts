import dayjs, { type Dayjs } from "dayjs";

export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";

export const formatDayJsDate = (value: Date | string): string => {
    return dayjs(value).format(DEFAULT_DATE_FORMAT);
};

export const isValidDateRange = (value: Date[] | Dayjs[]): boolean => {
    if (value.length !== 2) return false;
    return dayjs(value[0]).isValid() && dayjs(value[1]).isValid();
};

export const isValidDayJsDate = (value: Date | string | null): boolean => {
    if (typeof value !== "string" && !(value instanceof Date)) return false;
    return dayjs(value).isValid();
};

export const dayjsUtils = {
    format: (value: string, format?: string): Dayjs | undefined => {
        const _format = format || DEFAULT_DATE_FORMAT;
        const isValid = dayjs(value, _format).isValid();
        if (!isValid) return;
        return dayjs(value, _format);
    },
};
