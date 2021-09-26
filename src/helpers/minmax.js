const minMax = (value, range) => {
    return Math.min(range, Math.max(-range, value));
};

export { minMax };
