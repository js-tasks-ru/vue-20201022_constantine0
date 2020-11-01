import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
      <MeetupCover :title="meetup.title" :link="coverLink" />
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description" />

            <h3>Программа</h3>
            <MeetupAgenda v-if="meetup.agenda && meetup.agenda.length" :agenda="meetup.agenda" />
          </div>
          <div class="meetup__aside">
            <MeetupInfo v-if="info" v-bind="info" />
          </div>
        </div>
      </div>
    </div>`,

  components: {
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    coverLink() {
      return this.meetup.imageId ? getMeetupCoverLink(this.meetup) : "";
    },

    info() {
      if (Object.keys(this.meetup).length === 0) {
        return null;
      }

      return {
        "place": this.meetup.place,
        "organizer": this.meetup.organizer,
        "date": new Date(this.meetup.date),
      };
    },
  },
};
