<template>
  <div class="photo">
    <div class="wrapper">
      <a v-bind:href="attachment.fullUrl">
        <img v-bind:src="attachment.thumbnailUrl" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["attachment"]
};
</script>
