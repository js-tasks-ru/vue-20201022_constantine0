<template>
  <div class="form-section form-section_inner" v-if="localAgendaItem">
    <button type="button" class="remove-button" @click="$emit('remove');">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" title="Тип" v-model="localAgendaItem.type">
        <option v-for="item in $options.types" :key="item.value" :value="item.value">{{ item.text }}</option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input class="form-control" type="time" placeholder="00:00" v-model="localAgendaItem.startsAt" />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input class="form-control" type="time" placeholder="00:00" v-model="localAgendaItem.endsAt" />
        </div>
      </div>
    </div>

    <template v-if="isTalk">
      <div class="form-group">
        <label class="form-label">Тема</label>
        <input class="form-control" v-model="localAgendaItem.title" />
      </div>
      <div class="form-group">
        <label class="form-label">Докладчик</label>
        <input class="form-control" v-model="localAgendaItem.speaker" />
      </div>
      <div class="form-group">
        <label class="form-label">Описание</label>
        <textarea class="form-control" v-model="localAgendaItem.description"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Язык</label>
        <select class="form-control" v-model="localAgendaItem.language">
          <option v-for="item in $options.languages" :key="item.value" :value="item.value">{{ item.text }}</option>
        </select>
      </div>
    </template>
    <template v-else-if="isOther">
      <div class="form-group">
        <label class="form-label">Заголовок</label>
        <input class="form-control" v-model="localAgendaItem.title" />
      </div>
      <div class="form-group">
        <label class="form-label">Описание</label>
        <textarea class="form-control" v-model="localAgendaItem.description"></textarea>
      </div>
    </template>
    <template v-else>
      <div class="form-group">
        <label class="form-label">Нестандартный текст (необязательно)</label>
        <input class="form-control" v-model="localAgendaItem.title" />
      </div>
    </template>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

const getTimeInMs = ([hours, minutes]) => (hours * 3600 + minutes * 60) * 1000;
const getTimeInMsFromString = (str) => getTimeInMs(str.split(':'));

export default {
  name: 'MeetupAgendaItemForm',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  types: getAgendaItemTypes(),

  languages: getTalkLanguages(),

  mounted() {
    this.localAgendaItem = { ...this.agendaItem };
  },

  data() {
    return {
      localAgendaItem: null,
    };
  },

  computed: {
    isTalk() {
      return this.localAgendaItem.type === 'talk';
    },
    isOther() {
      return this.localAgendaItem.type === 'other';
    },
  },

  watch: {
    "localAgendaItem.startsAt"(newValue, oldValue) {
      if (!oldValue) {
        return;
      }

      const startsAtTimeDiff = getTimeInMsFromString(newValue) - getTimeInMsFromString(oldValue);
      const endsAtNewTime = getTimeInMsFromString(this.localAgendaItem.endsAt) + startsAtTimeDiff;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      today.setTime(today.getTime() + endsAtNewTime);

      this.localAgendaItem.endsAt = today.toLocaleTimeString('default', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    },

    localAgendaItem: {
      deep: true,
      handler(newAgendaItem) {
        this.$emit('update:agendaItem', { ...newAgendaItem });
      },
    },
  },
};
</script>

<style></style>
