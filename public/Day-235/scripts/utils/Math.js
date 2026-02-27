export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const chance = (percent) => Math.random() * 100 < percent;
