<template>
  <div>
    <div>
      <!--- list -->
      <div class="grid gap-2">
        <setup-page-interval v-for="interval in intervals" :key="interval.id" />
      </div>

      <!-- add button -->
      <button class="circle-btn">
        <font-awesome-icon icon="plus" @click="$emit('add-interval')" />
      </button>
    </div>

    <!-- start button -->
    <button @click="$emit('start-training')">START</button>
  </div>
</template>

<script>
export default {
  props: {
    intervals: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  emits: ["add-interval", "start-training"],
};
</script>
