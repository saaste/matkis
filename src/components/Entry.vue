<template>
  <div class="entry">
    
    <div>
      <h2>
        kello {{ entry.published | moment('HH:mm') }} - {{ entry.place.name }}, {{ entry.place.country }}<br />
        <span class="local-time">paikallinen aika {{ entry.publishedLocal | moment('HH:mm') }}</span><!-- TODO: Fix timezone -->
      </h2>
    </div>

    <div>
      <p class="formatted" v-html="entry.content"></p>
      <p>- {{ entry.author.name }}</p>
    </div>

    <div v-if="entry.attachments.length > 0" class="photos">
        <attachment v-for="attachment in entry.attachments" v-bind:key="attachment.id" v-bind:attachment="attachment" />
    </div>

    <div v-if="entry.comments.length > 0">
      <h4>Kommentit</h4>
      <comment v-for="comment in entry.comments" v-bind:key="comment.id" v-bind:comment="comment" />
    </div>

  </div>
</template>

<script>
export default {
  props: ["entry"],
}
</script>
