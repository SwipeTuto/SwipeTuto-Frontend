export const convertNumber = (number) => {
  const value = parseInt(number)
  if (value >= 0 && value < 1000) {
    return value;
  } else if (value >= 1000 && value < 10000) {
    return `${(value / 1000).toFixed(1)}k`;

  } else if (value >= 10000 && value < 1000000) {
    return `${(value / 1000).toFixed(0)}k`;

  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
}