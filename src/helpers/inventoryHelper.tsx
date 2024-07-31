const TWO_WEEK_MILLISECONDS = 12096e5;

export const closeExpiryFilter = (date: Date) => {
    const currentDate = new Date();
    return date >= currentDate && date < new Date(currentDate.getTime() + TWO_WEEK_MILLISECONDS);
};