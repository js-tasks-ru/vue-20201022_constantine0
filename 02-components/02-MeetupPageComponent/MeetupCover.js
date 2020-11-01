export const MeetupCover = {
  template: `<div class="meetup-cover" :style="coverStyles">
        <h1 v-if="title" class="meetup-cover__title">{{ title }}</h1>
    </div>`,

  props: {
    link: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },

  computed: {
    coverStyles() {
      return {
        '--bg-url': this.link ? `url(${this.link})` : '',
      };
    },
  },
};
