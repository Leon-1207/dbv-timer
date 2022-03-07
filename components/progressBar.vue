<template>
  <div class="h-2 w-full rounded-full bg-main-text-color">
    <div
      class="
        rounded-full
        h-2
        bg-gradient-to-r
        from-theme
        to-theme-gradient
        relative
      "
      :style="{ width: computedWidth }"
    >
      <div
        class="
          absolute
          right-0
          top-1/2
          w-4
          h-4
          rounded-full
          shadow-sm
          bg-theme
          transform
          -translate-y-1/2
          translate-x-1/2
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    computedWidth() {
      return String(this.progress * 100) + "%";
    },
  },
};
</script>