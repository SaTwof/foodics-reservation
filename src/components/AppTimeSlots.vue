<template>
  <div class="w-full">
    <label
      v-if="label"
      id="app-multiselect"
      class="block text-sm font-medium text-gray-700 capitalize"
      >{{ label }}</label
    >
    <div class="relative mt-1">
      <button
        type="button"
        class="
          relative
          w-full
          rounded-md
          border border-gray-300
          bg-white
          pl-1
          pr-10
          h-12
          text-left
          shadow-sm
          focus:border-indigo-500
          focus:outline-none
          focus:ring-1
          focus:ring-indigo-500
          sm:text-sm
        "
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="app-multiselect"
      >
        <div class="flex items-center">
          <span
            v-for="(slot, slotIndex) in localValue"
            :key="slotIndex"
            class="
              px-3
              py-1
              rounded-full
              text-gray-500
              bg-gray-100
              font-semibold
              text-sm
              flex
              align-center
              w-max
              mr-1
              whitespace-nowrap
              cursor-pointer
              active:bg-gray-300
              transition
              duration-300
              ease
            "
          >
            <AppTimeSlot
              :value="slot"
              @input="onChangeTimeSlot($event, slotIndex)"
            />
            <button
              class="bg-transparent hover focus:outline-none"
              @click="onClickRemoveTimeSlot(slotIndex)"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="times"
                class="w-2.5 ml-3"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 352 512"
              >
                <path
                  fill="currentColor"
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                ></path>
              </svg>
            </button>
          </span>
        </div>

        <span class="absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <AppButton
            rounded
            :disabled="!canAddMoreSlots"
            @click.native="onClickAddSTimeSlot"
          >
            <svg
              enable-background="new 0 0 50 50"
              height="18"
              version="1.1"
              viewBox="0 0 50 50"
              width="18"
            >
              <rect fill="none" height="50" width="50" />
              <line
                fill="none"
                stroke="#000000"
                stroke-miterlimit="10"
                stroke-width="4"
                x1="9"
                x2="41"
                y1="25"
                y2="25"
              />
              <line
                fill="none"
                stroke="#000000"
                stroke-miterlimit="10"
                stroke-width="4"
                x1="25"
                x2="25"
                y1="9"
                y2="41"
              />
            </svg>
          </AppButton>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'
import AppTimeSlot from '@/components/AppTimeSlot'

export default {
  name: 'AppTimeSlots',

  components: {
    AppButton,
    AppTimeSlot
  },

  props: {
    value: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: null
    }
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    canAddMoreSlots() {
      return this.localValue.length < 3
    }
  },

  methods: {
    onClickRemoveTimeSlot(slotIndex) {
      this.$set(
        this,
        'localValue',
        this.localValue.filter((_, index) => index !== slotIndex)
      )
    },
    onChangeTimeSlot(timeSlot, index) {
      this.$set(
        this,
        'localValue',
        this.value.map((slot, slotIndex) => {
          if (index === slotIndex) {
            return timeSlot
          }

          return slot
        })
      )
    },
    onClickAddSTimeSlot() {
      if (this.canAddMoreSlots) {
        this.$set(this, 'localValue', [...this.localValue, []])
      }
    }
  }
}
</script>