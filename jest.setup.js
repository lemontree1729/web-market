global.console = {
    ...console,
    log: jest.fn(),
    debug: (...args) => { args.map(value => console.dir(value, { depth: null })) }
}

