// renvoyer un objet date au format JJ/MM/AAAA
export const commentsFormattedDate = (date) => {
  const dateDate = new Date(date)
  const now = new Date()
  const nowMS = now.getTime();
  const dateMS = dateDate.getTime();
  let oneDayMS = new Date(86400000);
  oneDayMS = oneDayMS.getTime();
  let oneHourMS = new Date(3600000);
  oneHourMS = oneHourMS.getTime();
  let formattedDateValue;

  // si le même jour, calcul nb heure, sinon date entière
  if (dateMS > nowMS - oneDayMS) {
    if (dateMS > nowMS - oneHourMS) {
      formattedDateValue = "Moins d'une heure."
    } else {
      let diff = new Date(nowMS - dateMS);
      diff = diff.getTime();
      formattedDateValue = `${Math.floor(diff / oneHourMS)}h`;
    }
  } else {
    const day =
      dateDate.getDate() < 10
        ? `0${dateDate.getDate()}`
        : dateDate.getDate();
    const month =
      dateDate.getMonth() + 1 < 10
        ? `0${dateDate.getMonth() + 1}`
        : dateDate.getMonth() + 1;
    const year = dateDate.getFullYear();
    formattedDateValue = `${day}/${month}/${year}`;
  }
  return formattedDateValue;
};

export const formattedDate = (date) => {
  const dateDate = new Date(date)
  const day =
    dateDate.getDate() < 10
      ? `0${dateDate.getDate()}`
      : dateDate.getDate();
  const month =
    dateDate.getMonth() + 1 < 10
      ? `0${dateDate.getMonth() + 1}`
      : dateDate.getMonth() + 1;
  const year = dateDate.getFullYear();
  return `${day}/${month}/${year}`;
};