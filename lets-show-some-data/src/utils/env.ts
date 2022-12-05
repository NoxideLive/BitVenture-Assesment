export const getEnv = (key: string, defaultValue: string): string => {
    if (!process.env[key]) {
        console.warn(`Missing environment variable: ${key}`);
        return defaultValue;
    }
    return process.env[key] as string;
}
