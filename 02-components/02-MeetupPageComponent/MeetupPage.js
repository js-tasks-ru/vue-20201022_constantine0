import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div><MeetupView :meetup="meetup"/></div>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      meetup: {},
    };
  },

  mounted() {
    this.fetchMeetupData();
  },

  methods: {
    async fetchMeetupData() {
      this.meetup = await fetchMeetup(MEETUP_ID);
    },
  },
};
