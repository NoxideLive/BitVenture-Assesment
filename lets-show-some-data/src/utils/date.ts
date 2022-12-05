export const parseDate = (date: string | null): Date | null => {
    if (date) {
        return new Date(Date.parse(date));
    }
    return null;
};
