<template>
  <div>
    <span>Gesamtdauer: {{ totalDuration }}</span>
  </div>
</template>

<script>
export default {
  props: {
    intervals: {
      type: Array,
      required: true,
    },
  },

  computed: {
    totalDuration() {
      return "TODO";
    },
  },
};
</script>