<template>
  <div>
    <p>Mitä uudempi, sitä uudempi!</p>
  </div>
</template>
<script>
import EventBus from '../components/EventBus'
import Events from '../models/Events'
export default {
    mounted() {
    EventBus.$emit(Events.CURRENT_DIARY_CHANGED, null);
    EventBus.$emit(Events.CURRENT_DATE_CHANGED, { // TODO: Make a class
      currentDate: null,
      previousDatePath: null,
      nextDatePath: null
    });
  }
}
</script>
