<template>
  <div>
    <div class="content">
      <div id="album">
        <h1>Albumit</h1>
        <div v-for="destination in albums" v-bind:key="destination.country">
          <h2>{{ destination.country }}</h2>
          <div class="country-albums">
            <div v-for="destinationAlbum in destination.albums" v-bind:key="destinationAlbum.place.id" class="country-album">
              <div class="photo">
                <router-link v-bind:to="destinationAlbum.path">
                  <img v-bind:src="destinationAlbum.previewImage.thumbnailUrl" />
                </router-link>
              </div>
              <div class="description">
                <strong>{{ destinationAlbum.place.name }}</strong>
                <br />
                Kuvia: {{ destinationAlbum.photoCount}}
              </div>
            </div>
          </div>
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
  props: ["urlName"],
  data() {
    return {
      albums: [],
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
      let albumPromise = AlbumService.getAlbums(this.urlName);

      Promise.all([diaryPromise, albumPromise]).then(results => {
        let [diary, albums] = results;
        if (diary && albums) {
          this.diary = diary;
          this.albums = albums;
        } else {
          this.notFound = true;
        }
      });
    }
  }
};
</script>
