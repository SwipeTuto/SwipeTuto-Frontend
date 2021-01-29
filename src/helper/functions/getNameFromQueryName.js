export const getNameFromQueryName = (array, queryName) => {
  if (queryName === '' || undefined || null) {
    return array.filter(item => item.queryName === null)[0].name
  } else {
    return array.filter(item => item.queryName === queryName)[0].name
  }
}