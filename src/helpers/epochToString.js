const epochToString = (timestamp) => {
    const epochDate = new Date(timestamp);
    return `${epochDate.getDate()}/${epochDate.getMonth() + 1}/${epochDate.getFullYear()}`;
};

export { epochToString };
