<template>
  <div class="modal-overlay overflow-auto">
    <div class="modal bg-opacity-50">
      <h6>{{ title }}</h6>

      <div class="flex min-h-full flex-col justify-between">
        <div class="border-b border-solid">
          <slot name="body" />
        </div>

        <div
          class="
            dialog-bottom
            py-1.5
            border-t border-solid
            h-12
            flex
            items-center
            justify-center
          "
        >
          <slot name="bottom" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  z-index: 50;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  width: 500px;
  margin-top: 10%;
  margin-bottom: 10%;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 20px;
  padding-left: 18px;
  padding-right: 18px;
}
</style>


<style lang="postcss">
.dialog-bottom button {
  @apply h-full flex-grow border-l border-solid font-semibold;
}

.dialog-bottom button:first-of-type {
  @apply border-none;
}

.dialog-title {
  @apply text-3xl sm:text-4xl mb-4 mt-6 font-bold;
}
</style>