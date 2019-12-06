<template>
  <entry-list
    class="pure-u-3-4"
    v-bind:url-name="urlName"
    v-bind:year="year"
    v-bind:month="month"
    v-bind:day="day"
  />
</template>

<script>
export default {
  props: ["urlName", "year", "month", "day"]
};
</script>
