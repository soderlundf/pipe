import { createContainer, asValue, asFunction } from 'awilix';

const container = createContainer();

container.register({
    logger: asValue(logger), // Din egen logger med log och error

    pipe: asFunction(({ logger }) => {
        return (source, ...operations) =>
            pipeWithLogger(logger, source, ...operations);
    })
});

const pipe = container.resolve('pipe');
const result = await pipe(3, addOne, double); // 8