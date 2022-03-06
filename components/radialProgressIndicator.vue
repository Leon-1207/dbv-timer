<template>
  <div class="bg-white rounded-full">
    <slot />
    {{ intervalKind }}
    {{ intervalProgress }}
    {{ trainingProgress }}
  </div>
</template>


<script>
export default {
  props: {
    intervalKind: {
      type: String,
      required: true,
    },
    intervalProgress: {
      type: Number,
      required: true,
    },
    trainingProgress: {
      type: Number,
      required: true,
    },
  },
};
</script>