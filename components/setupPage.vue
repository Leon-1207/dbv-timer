<template>
  <div
    id="setup-page"
    class="
      content-wrapper
      relative
      min-h-screen
      flex flex-col
      justify-between
      px-6
    "
  >
    <div class="w-full">
      <div class="page-top-wrapper mb-10">
        <h2 class="page-title">Intervalle bearbeiten</h2>
      </div>

      <!--- list -->
      <div>
        <div class="grid gap-2">
          <setup-page-interval
            v-for="(interval, index) in intervals"
            :key="index"
            :interval="interval"
          />
        </div>

        <div v-if="!hasIntervals" class="info-box">
          <span class="font-semibold"
            >Du hast noch kein Intervall zum Training hinzufügt</span
          >
          <br />
          <span
            class="text-blue-500 hover:text-blue-300 underline cursor-pointer"
            @click="$emit('add-interval')"
            >Intervall hinzufügen</span
          >
        </div>
      </div>

      <!-- add button -->
      <div class="w-full flex items-center my-6">
        <button
          class="
            circle-btn
            text-4xl
            w-14
            h-14
            text-theme
            hover:text-theme-light
            mx-auto
          "
        >
          <font-awesome-icon icon="plus" @click="$emit('add-interval')" />
        </button>
      </div>
    </div>

    <!-- bottom (duration + start) -->
    <div class="page-bottom-wrapper">
      <!-- start button -->
      <button
        class="
          py-2
          px-10
          rounded-full
          bg-gradient-to-br
          from-theme
          to-theme-gradient
          text-white text-xl
          flex flex-nowrap
          justify-center
          items-center
        "
        @click="$emit('start-training')"
      >
        <font-awesome-icon icon="bolt" />
        <span class="ml-2.5">START</span>
      </button>

      <!-- duration -->
      <setup-page-training-data :intervals="intervals" />
    </div>
  </div>
</template>

<script>
import setupPageTrainingData from "./setupPageTrainingData.vue";

export default {
  components: { setupPageTrainingData },

  props: {
    intervals: {
      type: Array,
      required: true,
    },
  },

  emits: ["add-interval", "start-training"],

  computed: {
    hasIntervals() {
      return this.intervals.length > 0;
    },
  },
};
</script>
