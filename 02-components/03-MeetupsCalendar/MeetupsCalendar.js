import {
  ONE_DAY_IN_MILLISECONDS,
  getMonthFirstDay,
  getNextMonthFirstDate,
  getPrevMonthFirstDate,
  getWeekMonday,
} from './dateUtils.js';

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="navigateBack"></button>
          <div>{{ navigationTitle }}</div>
          <button class="rangepicker__selector-control-right" @click="navigateForward"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="data in calendarDays" class="rangepicker__cell" :class="{ 'rangepicker__cell_inactive': data.disabled }">
            {{ data.day }}
            <a v-for="meetup in data['meetups']" class="rangepicker__event">{{ meetup.title }}</a>
        </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      displayDate: getMonthFirstDay(new Date()),
    };
  },

  computed: {
    meetupsByDate() {
      const meetupsByDate = {};
      for (let meetup of this.meetups) {
        const meetupDate = new Date(meetup.date).toDateString();

        if (!meetupsByDate[meetupDate]) {
          meetupsByDate[meetupDate] = [];
        }

        meetupsByDate[meetupDate].push(meetup);
      }

      return meetupsByDate;
    },

    navigationTitle() {
      return `${this.displayDate.toLocaleDateString('default', {
        month: 'long',
        year: 'numeric',
      })}`;
    },

    calendarDays() {
      const date = getWeekMonday(this.displayDate);
      const days = [];
      let isMonthEnded = false;

      while (!isMonthEnded || (isMonthEnded && days.length % 7 != 0)) {
        days.push({
          day: date.getDate(),
          disabled: date.getMonth() != this.displayDate.getMonth(),
          meetups: this.meetupsByDate[date.toDateString()] ?? [],
        });

        date.setTime(date.getTime() + ONE_DAY_IN_MILLISECONDS);

        isMonthEnded =
          date.getMonth() > this.displayDate.getMonth() ||
          date.getFullYear() > this.displayDate.getFullYear();
      }

      return days;
    },
  },

  methods: {
    navigateBack() {
      this.displayDate = getPrevMonthFirstDate(this.displayDate);
    },
    navigateForward() {
      this.displayDate = getNextMonthFirstDate(this.displayDate);
    },
  },
};
