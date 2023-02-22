const addDateSuffix = (date) => {
  const dateStr = date.toString();
  const lastTwoDigits = parseInt(dateStr.slice(-2));
  let suffix;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    suffix = 'th';
  } else {
    const lastDigit = parseInt(dateStr.slice(-1));

    switch (lastDigit) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
        break;
    }
  }

  return `${date}${suffix}`;
};

const getMonthName = (index, monthLength) => {
  const months = {
    short: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    long: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
  };

  return months[monthLength][index];
};

module.exports = (timestamp, options = {}) => {
  const { monthLength = 'short', dateSuffix = true } = options;

  const dateObj = new Date(timestamp);
  const monthIndex = dateObj.getMonth();
  const formattedMonth = getMonthName(monthIndex, monthLength);

  const dayOfMonth = dateSuffix
    ? addDateSuffix(dateObj.getDate())
    : dateObj.getDate();

  const year = dateObj.getFullYear();
  let hour = dateObj.getHours() % 12 || 12;
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};

