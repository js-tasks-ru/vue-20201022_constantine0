import { createApp } from './vue3.esm-browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const APP_ELEMENT = "#app";

export const app = createApp({
  data() {
    return {
      meetup: {},
    };
  },

  mounted() {
    this.fetchMeetupData();
  },

  computed: {
    imageUrl() {
      if (!this.meetup.imageId) {
        return null;
      }

      return getMeetupCoverLink(this.meetup);
    },

    showInfoList() {
      return this.meetup.organizer || this.meetup.place || this.meetup.date;
    },

    isAgendaExists() {
      return this.meetup.agenda && this.meetup.agenda.length > 0
    },
  },

  methods: {
    async fetchMeetupData() {
      const apiUrl = `${API_URL}/meetups/${MEETUP_ID}`;
      const apiResponse = await fetch(apiUrl);

      if (apiResponse.ok) {
        const meetupData = await apiResponse.json();

        this.$data.meetup = meetupData;
      }
    },

    getDefaultPointTitle(type) {
      return agendaItemTitles[type] || agendaItemTitles.other;
    },

    getPointIcon(type) {
      return agendaItemIcons[type] || agendaItemIcons.other;
    },
  },
});

app.config.globalProperties.$filters = {
  localizeDate(timestamp) {
    return new Date(timestamp).toLocaleDateString({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  dateToHtml5Input(timestamp) {
    return new Date(timestamp).toISOString().split("T")[0];
  },
};

app.mount(APP_ELEMENT);
