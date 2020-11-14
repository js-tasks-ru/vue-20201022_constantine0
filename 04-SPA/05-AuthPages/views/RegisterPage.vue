<template>
  <form class="form" @submit="register">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" class="form-control" v-model="email" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input type="text" class="form-control" v-model="name" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="password" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model="passwordConfirm" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"><input type="checkbox" v-model="isToSAssepted" /> Я согласен с условиями <span></span></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">Зарегистрироваться</button>
    </div>
    <div class="form__append">Уже есть аккаунт? <router-link :to="{'name': 'login'}" class="link">Войдите</router-link></div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',

  data() {
    return {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      isToSAssepted: false,
    };
  },

  rules: {
    "Требуется ввести Email": that => !that.email,
    "Требуется ввести полное имя": that => !that.name,
    "Требуется ввести пароль": that => !that.password,
    "Пароли не совпадают": that => that.password != that.passwordConfirm,
    "Требуется согласиться с условиями": that => !that.isToSAssepted,
  },

  methods: {
    validateForm() {
      for (const [message, rule] of Object.entries(this.$options.rules)) {
        if (rule(this)) {
          alert(message);

          return false;
        }
      }

      return true;
    },

    async register() {
      if (this.validateForm()) {
        const response = await register(this.email, this.name, this.password);

        if (response.id) {
          alert(response.id);
        } else {
          alert(response.message);
        }
      }
    },
  },
};
</script>

<style scoped></style>
