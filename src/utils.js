const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

module.exports = {
  localeUtils: {
    formatWeekdayLong: function(weekday) {
      return WEEKDAYS_LONG[weekday];
    },
    formatWeekdayShort: function(weekday) {
      return WEEKDAYS_SHORT[weekday];
    }
  }
};
