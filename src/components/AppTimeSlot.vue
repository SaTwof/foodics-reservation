<template>
  <button
    class="
      flex
      justify-center
      bg-white
      border
      py-1
      rounded-md
      border border-gray-300
      bg-white
      focus:border-indigo-500
      focus:outline-none
      focus:ring-1
      focus:ring-indigo-500
      sm:text-sm
    "
  >
    <div class="flex w-16">
      <AppInputNumber
        v-model="startH"
        class="w-7 text-center"
        @input="onChangeTimeSlot"
      />
      <span>:</span>
      <AppInputNumber
        v-model="startM"
        class="w-7 text-center"
        @input="onChangeTimeSlot"
      />
    </div>

    <div>-</div>

    <div class="flex w-16">
      <AppInputNumber
        v-model="endH"
        class="w-7 text-center"
        @input="onChangeTimeSlot"
      />
      <span>:</span>
      <AppInputNumber
        v-model="endM"
        class="w-7 text-center"
        @input="onChangeTimeSlot"
      />
    </div>
  </button>
</template>

<script>
import AppInputNumber from '@/components/AppInputNumber'

export default {
  name: 'AppTimeSlot',

  components: {
    AppInputNumber
  },

  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    startH: '00',
    startM: '00',
    endH: '00',
    endM: '00'
  }),

  watch: {
    value() {
      this.setLocalValues()
    }
  },

  created() {
    this.setLocalValues()
  },

  methods: {
    onChangeTimeSlot() {
      this.$emit('input', [
        `${this.startH}:${this.startM}`,
        `${this.endH}:${this.endM}`
      ])
    },
    setLocalValues() {
      const [startTime, endTime] = this.value

      if (startTime) {
        const [startH, startM] = startTime.split(':')
        this.startH = startH
        this.startM = startM
      }

      if (endTime) {
        const [endH, endM] = endTime.split(':')
        this.endH = endH
        this.endM = endM
      }
    }
  }
}
</script>
