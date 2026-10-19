import { addOne, double } from "./functions.js";

export async function pipe(logger, source, ...operations) {
    let step = 'source';

    try {
        let result = await source;
        logger.log('[pipe] source:', result);

        for (const [index, operation] of operations.entries()) {
            step = `step ${index + 1} (${operation.name || 'anonymous'})`;
            result = await operation(result);
            logger.log(`[pipe] ${step}:`, result);
        }

        return result;
    } catch (error) {
        logger.error(`[pipe] failed at ${step}:`, error);
        throw error;
    }
}

// const result = await pipe(console, 3, addOne, double, double, double);
// console.log(result); // 8: (3 + 1) * 2
