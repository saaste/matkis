<template>
  <div>
    <p class="formatted">{{ comment.content }}</p>
    <p>- {{ comment.author.name }} / {{ comment.published | moment('dddd, Do MMMM YYYY') }}</p>
    <div v-if="comment.reply !== ''" class="comment-reply formatted">{{ comment.reply }}</div>
  </div>
</template>

<script>
export default {
  props: ["comment"]
};
</script>
