<template>
  <div>
    <div v-if="diary">
      <div v-if="hasEntries">
        <entry v-for="entry in entries" v-bind:key="entry.id" v-bind:entry="entry" />
      </div>
      <div v-else>
        <p>Valitsemallasi päivällä ja aikavyöhykkeellä ei löydy yhtään kirjoitusta.</p>
      </div>
    </div>
    <not-found v-if="notFound" />
  </div>
</template>

<script>
import DiaryService from "../services/DiaryService";
import EntryService from "../services/EntryService";
import EventBus from "./EventBus";
import Events from "../models/Events";

export default {
  props: ["urlName", "year", "month", "day"], // TODO: Move all this logic to view
  data() {
    return {
      diary: null,
      entries: [],
      notFound: false
    };
  },
  computed: {
    hasEntries() {
      return this.entries.length > 0
    }
  },
  mounted() {
    this.updateData();
  },
  watch: {
    $route: "updateData"
  },
  methods: {
    getDiary(urlName) {
      return DiaryService.getDiary(urlName);
    },
    getEntries(diary, year, month, day) {
      if (diary) {
        return EntryService
        .getEntriesWithDates(diary.urlName, year, month, day)
        .then(entryData => {
          if (entryData && entryData.entries) {
            entryData.entries.forEach(entry => {
              entry.publishedLocal = this.$moment.utc(entry.published).utcOffset(entry.timeZoneOffset);
            });
            return { diary: diary, entryData: entryData };
          } else {
            return { diary: diary, entryData: null };
          }
        });
      } else {
        return Promise.reject({ diary: diary, entryData: null });
      }
    },
    updateData() {
      this.getDiary(this.urlName)
        .then(diary => {
          return this.getEntries(diary, this.year, this.month, this.day);
        })
        .then(result => {
          EventBus.$emit(Events.CURRENT_DIARY_CHANGED, result.diary);
          EventBus.$emit(Events.CURRENT_DATE_CHANGED, {
            currentDate: result.entryData.dates.currentDate,
            previousDatePath: result.entryData.dates.previousDatePath,
            nextDatePath: result.entryData.dates.nextDatePath
          });
          this.diary = result.diary;
          this.notFound = result.diary === null;
          this.entries = result.entryData.entries;
        })
        .catch(err => {
          this.notFound = err.diary === null;
        });
    }
  }
};
</script>
