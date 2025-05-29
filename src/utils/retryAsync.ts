import logger from "../logger/index";

export async function retryAsync<T>(
    fn: () => Promise<T>,
    options?: {
        retries?: number;
        delayMs?: number;
        onRetry?: (attempt: number, error: unknown) => void;
        label?: string;
    }
): Promise<T> {
    const {
        retries = 5,
        delayMs = 3000,
        onRetry,
        label = 'operation',
    } = options || {};

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            if (attempt < retries) {
                onRetry?.(attempt, err);
                logger.warn(
                    `Attempt ${attempt} failed for ${label}: ${err instanceof Error ? err.message : err}`
                );
                logger.info(`Retrying ${label} in ${delayMs / 1000} seconds...`);
                await delay(delayMs);
            } else {
                logger.error(`All ${retries} attempts failed for ${label}`);
                throw err;
            }
        }
    }
    throw new Error(`Retry logic failed unexpectedly for ${label}`); // Should never hit
}