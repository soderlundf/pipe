import { readFile } from 'node:fs/promises';

import { addOne, double } from "./functions.js";
import { pipe } from './index.js';

const operations = { addOne, double };

const config = JSON.parse(
    await readFile(new URL('./pipeline.json', import.meta.url), 'utf8')
);

if (!Array.isArray(config.steps)) {
    throw new Error('Expected steps to be an array');
}

const steps = config.steps.map(name => {
    if (typeof name !== 'string' || !Object.hasOwn(operations, name)) {
        throw new Error(`Unknown pipeline step: ${String(name)}`);
    }

    return operations[name];
});

const result = await pipe(console, 3, ...steps);
console.log(result); // 8