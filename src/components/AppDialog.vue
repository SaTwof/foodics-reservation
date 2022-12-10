<template>
  <transition name="app-dialog" mode="out-in">
    <div
      v-if="showDialog"
      class="relative z-10"
      aria-labelledby="dialog-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div class="fixed inset-0 z-10 overflow-y-auto" @click="onClickDropOff">
        <div
          class="
            flex
            min-h-full
            items-end
            justify-center
            p-4
            text-center
            items-center
            sm:p-0
          "
        >
          <div
            ref="dialogContent"
            class="
              relative
              transform
              text-left
              shadow-xl
              transition-all
              sm:my-8 sm:w-full sm:max-w-2xl
            "
          >
            <button
              v-if="!persistence"
              type="button"
              class="absolute text-gray-400 hover:text-gray-500 top-5 right-5"
              @click="onCloseDialog"
            >
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    v-if="title"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    {{ title }}
                  </h3>
                </div>
              </div>

              <div class="pt-5 pb-2">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppDialog',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    persistence: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    }
  },

  computed: {
    showDialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    onCloseDialog() {
      if (!this.persistence) {
        this.showDialog = false
      }
    },
    onClickDropOff(e) {
      if (
        !this.persistence &&
        !e.composedPath().includes(this.$refs.dialogContent)
      ) {
        this.showDialog = false
      }
    }
  }
}
</script>

<style scoped>
.app-dialog-enter-active {
  animation: app-dialog-animation 0.5s ease-in-out forwards;
}
.app-dialog-leave-active {
  animation: app-dialog-animation 0.5s ease-in-out reverse forwards;
}
@keyframes app-dialog-animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>