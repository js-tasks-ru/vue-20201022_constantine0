<template>
  <form
    v-if="localMeetup"
    class="form meetup-form"
    @submit.prevent="saveMeetup"
  >
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="localMeetup.title" />
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input class="form-control" type="date" v-model="localMeetup.date" />
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="localMeetup.place" />
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="localMeetup.description"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="localMeetup.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        class="mb-3"
        v-for="item in localMeetup.agenda"
        :key="item.createIndex"
        :agendaItem="cloneAgendaItem(item)"
        @update:agendaItem="syncAgendaItem(item.createIndex, $event)"
        @remove="removeAgendaItem(item.createIndex)"
      />

      <div class="form-section_append">
        <button
          type="button"
          data-test="addAgendaItem"
          @click="addAgendaItem"
        >
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          data-test="cancel"
          @click="$emit('cancel')"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText || 'Submit' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';

function buildAgendaItem() {
  return {
    id: Math.random(),
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },

  data() {
    return {
      localMeetup: null,
      agendaItemsCount: 0,
    };
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
      required: false,
    },
  },

  mounted() {
    this.localMeetup = this.cloneMeetup(this.meetup);
    this.localMeetup.agenda.forEach(
      (item) => (item.createIndex = this.agendaItemsCount++),
    );
  },

  methods: {
    saveMeetup() {
      this.$emit('submit', this.cloneMeetup(this.localMeetup));
    },

    addAgendaItem() {
      let newItem = { createIndex: this.agendaItemsCount++ };

      if (this.localMeetup.agenda.length > 0) {
        newItem['startsAt'] = this.localMeetup.agenda[this.localMeetup.agenda.length - 1].endsAt;
      }

      this.localMeetup.agenda.push(newItem);
    },

    removeAgendaItem(createIndex) {
      this.localMeetup.agenda.splice(
        this.localMeetup.agenda.findIndex(
          (item) => item.createIndex === createIndex,
        ),
        1,
      );
    },

    syncAgendaItem(createIndex, updatedValue) {
      const index = this.localMeetup.agenda.findIndex(
        (item) => item.createIndex === createIndex,
      );

      this.localMeetup.agenda[index] = Object.assign(this.localMeetup.agenda[index], updatedValue);
    },

    cloneMeetup(inputMeetup) {
      let meetup = { ...inputMeetup, agenda: null };
      meetup.agenda = inputMeetup.agenda.map(this.cloneAgendaItem);

      return meetup;
    },

    cloneAgendaItem(item) {
      return Object.fromEntries(
        Object.entries(item).filter(([key]) => key != 'createIndex'),
      );
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
