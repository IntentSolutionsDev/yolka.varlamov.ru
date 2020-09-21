const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  const day = date.getUTCDate();
  let dayFmt = day.toString();
  if (day < 10) {
    dayFmt = `0${day}`;
  }

  const month = date.getUTCMonth() + 1;
  let monthFmt = month.toString();
  if (month < 10) {
    monthFmt = `0${month}`;
  }

  return `${dayFmt}.${monthFmt}`;
};

export default formatDate;
