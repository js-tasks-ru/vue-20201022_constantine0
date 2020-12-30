const YYYY = (date) => date.getUTCFullYear();
const MM = (date) => (date.getUTCMonth() + 1).toString().padStart(2, '0');
const DD = (date) => date.getUTCDate().toString().padStart(2, '0');
const hh = (date) => date.getUTCHours().toString().padStart(2, '0');
const mm = (date) => date.getUTCMinutes().toString().padStart(2, '0');
const ss = (date) => date.getUTCSeconds().toString().padStart(2, '0');

const dateFormatter = (date) => [YYYY(date), MM(date), DD(date)].join('-');
const timeFormatter = (date) => [hh(date), mm(date)].join(':');
const timeWithSecondsFormatter = (date) =>
  [hh(date), mm(date), ss(date)].join(':');
const datetimeLocalFormatter = (date) =>
  `${dateFormatter(date)}T${timeFormatter(date)}`;

export {
  dateFormatter,
  timeFormatter,
  timeWithSecondsFormatter,
  datetimeLocalFormatter,
};
