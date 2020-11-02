import { agendaItemTitles, agendaItemIcons } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="iconSrc" />
      </div>
      <div class="meetup-agenda__item-col">{{ time }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ agendaItem.title || defaultTitle }}</h5>
        <p v-if="agendaItem.speaker || agendaItem.language">
          <span v-if="agendaItem.speaker">{{ agendaItem.speaker }}</span>
          <span v-if="agendaItem.speaker && agendaItem.language" class="meetup-agenda__dot"></span>
          <span v-if="agendaItem.language" class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    time() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
    },
    defaultTitle() {
      return agendaItemTitles[this.agendaItem.type] || agendaItemTitles.other;
    },
    iconSrc() {
      const icon = agendaItemIcons[this.agendaItem.type] || agendaItemIcons.other;

      return `/assets/icons/icon-${icon}.svg`;
    },
  },
};
