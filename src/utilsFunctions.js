export const truncate = (str, n, useWordBoundary) => {
  if (str.length <= n) {
    return str;
  }
  const subString = str.substr(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
};


export const formattedDate = (date) => {
  const day =
    date.getDate() < 10
      ? `0${date.getDate()}`
      : date.getDate();
  const month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const renameCategory = (category) => {
  switch (category) {
    case "theorie":
      return "Théorie";
    case "code":
      return "Code";
    case "design":
      return "Design";
    case "performances":
      return "Performances";
    case "ressources":
      return "Ressources";
    case "autre":
      return "Autre";
    default:
      return category;
  }
}