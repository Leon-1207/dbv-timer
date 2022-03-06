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
        <h2 class="page-title">Plane dein Training</h2>
      </div>

      <!--- list -->
      <div>
        <div class="grid gap-2">
          <setup-page-interval
            v-for="(interval, index) in intervals"
            :key="index"
            :interval="interval"
            @edit-interval="$emit('edit-interval', index)"
            @delete-interval="$emit('delete-interval', index)"
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
            w-14
            h-14
            text-theme
            hover:text-theme-light
            mx-auto
            hover-uplift
          "
        >
          <font-awesome-icon
            style="font-size: 36px"
            icon="plus"
            @click="$emit('add-interval')"
          />
        </button>
      </div>
    </div>

    <!-- bottom (duration + start) -->
    <div class="page-bottom-wrapper text-lg sm:text-xl">
      <!-- start button -->
      <button
        class="
          py-1
          px-6
          sm:py-2 sm:px-10
          rounded-full
          bg-gradient-to-br
          from-theme
          to-theme-gradient
          text-white
          flex flex-nowrap
          justify-center
          items-center
          shadow-md
          hover-uplift
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

  emits: ["add-interval", "start-training", "edit-interval", "delete-interval"],

  computed: {
    hasIntervals() {
      return this.intervals.length > 0;
    },
  },
};
</script>


<style lang="postcss" scoped>
#setup-page .page-top-wrapper {
  @apply bg-gradient-to-br from-theme to-theme-gradient text-white border-none;
}
#setup-page .page-top-wrapper > * {
  @apply text-white;
}

#setup-page .page-bottom-wrapper {
  @apply mt-20;
}
</style>