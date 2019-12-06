<template>
  <div>
    <h1><router-link to="/">Matkis</router-link></h1>

    <div v-if="diary">
      <h2>{{ diary.name }}</h2>
      <h3 v-if="currentDate">{{ currentDate | moment('dddd, Do MMMM YYYY') }}</h3>
      <div class="diary-navigation">
        <div class="pure-u-1-3 previous-day">
          <router-link v-if="previousDatePath" v-bind:to="previousDatePath">&laquo; Edellinen päivä</router-link>
          <span v-else>&laquo; Edellinen päivä</span>
        </div>
        <div class="pure-u-1-3 albums">
          <router-link v-bind:to="albumPath">Valokuvat</router-link>
        </div>
        <div class="pure-u-1-3 next-day">
          <router-link v-if="nextDatePath" v-bind:to="nextDatePath">Seuraava päivä &raquo;</router-link>
          <span v-else>Seuraava päivä &raquo;</span>
        </div>
      </div>
      <hr />
    </div>

    <div v-if="this.diaries.length > 0" class="pure-menu">
      <h2>Matkapäiväkirjat</h2>
      <ul class="pure-menu-list">
        <li v-for="diary in diaries" v-bind:key="diary.urlName" class="pure-menu-item">
          <router-link v-bind:to="diary.path" class="pure-menu-link">{{ diary.name }}</router-link>
        </li>
      </ul>
    </div>

    <div class="timezone-selection">
      Aikavyöhyke:
      <select v-model="timezone" @change="handleTimezoneChanged()">
        <option v-for="tz in timezones" v-bind:value="tz">{{ tz }}</option>
      </select>
    </div>
  </div>

</template>

<script>
import EventBus from "./EventBus";
import Events from "../models/Events";
import LocalStorageService from "../services/LocalStorageService";
import DiaryService from "../services/DiaryService";

export default {
  data() {
    return {
      diary: null,
      diaries: [],
      currentDate: null,
      previousDatePath: null,
      nextDatePath: null,
      timezone: null,
      timezones: []
    };
  },
  created() {
    EventBus.$on(Events.CURRENT_DIARY_CHANGED, this.handleCurrentDiaryChanged);
    EventBus.$on(Events.CURRENT_DATE_CHANGED, this.handleCurrentDateChanged);
    this.updateData();
  },
  computed: {
    albumPath() {
      return `/${this.diary.urlName}/albums/`;
    }
  },
  methods: {
    handleCurrentDiaryChanged(diary) {
      this.diary = diary;
    },
    handleCurrentDateChanged(dates) {
      this.currentDate = dates.currentDate;
      this.previousDatePath = dates.previousDatePath;
      this.nextDatePath = dates.nextDatePath;
    },
    handleTimezoneChanged() {
      LocalStorageService.setTimezone(this.timezone)
      this.$router.go()
    },
    updateCurrentTimezone() {
      this.timezone = LocalStorageService.getTimezone();
      this.timezones = this.$moment.tz.names();
    },
    updateDiaries() {
      DiaryService.getDiaries()
        .then(diaries => {
          this.diaries = diaries
        });
    },
    updateData() {
      this.updateCurrentTimezone()
      this.updateDiaries()
    }
  }
};
</script>
