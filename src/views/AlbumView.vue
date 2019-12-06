<template>
  <div>
    <div class="content">
      <div id="album">
        <h1>Valokuvat</h1>
        <div v-for="photo in photos" v-bind:key="photo.id">
          <a v-bind:href="photo.fullUrl">
            <img v-bind:src="photo.thumbnailUrl" />
          </a>
        </div>
      </div>
    </div>
    <div v-if="notFound">
      <div class="content">Not found</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DiaryService from "../services/DiaryService";
import AlbumService from "../services/AlbumService";

export default {
  props: ["urlName", "placeId"],
  data() {
    return {
      photos: [],
      diary: null,
      diaryName: null,
      notFound: false
    };
  },
  beforeMount() {
    this.updateData();
  },
  watch: {
    $route: "updateData"
  },
  methods: {
    updateData() {
      let diaryPromise = DiaryService.getDiary(this.urlName);
      let photosPromise = AlbumService.getPhotos(this.urlName, this.placeId);

      Promise.all([diaryPromise, photosPromise]).then(results => {
        let [diary, photos] = results;
        if (diary && photos) {
          this.diary = diary;
          this.photos = photos;
        } else {
          this.notFound = true;
        }
      });
    }
  }
};
</script>
