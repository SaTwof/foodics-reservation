<template>
  <div class="w-full">
    <div v-for="(day, dayIndex) in weekDays" :key="dayIndex" class="mb-4">
      <div class="relative">
        <button
          v-if="day === 'saturday'"
          @click="onClickApplyOnAllDays(day)"
          class="absolute right-0 -top-1 text-purple-700 font-medium text-sm"
        >
          Apply on all days
        </button>

        <AppTimeSlots
          :value="localValue[day] || []"
          :label="day"
          @input="onChangeDayTimeSlots($event, day)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppTimeSlots from '@/components/AppTimeSlots'

export default {
  name: 'AppReservationTimes',

  components: {
    AppTimeSlots
  },

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    weekDays: [
      'saturday',
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday'
    ]
  }),

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    onChangeDayTimeSlots(value, day) {
      this.$set(this, 'localValue', {
        ...this.localValue,
        [day]: value
      })
    },
    onClickApplyOnAllDays(day) {
      const dayValue = this.localValue[day] || []

      this.$set(
        this,
        'localValue',
        this.weekDays.reduce(
          (result, day) => ({
            ...result,
            [day]: [...dayValue]
          }),
          {}
        )
      )
    }
  }
}
</script>