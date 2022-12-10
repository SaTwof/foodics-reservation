<template>
  <input
    class="
      block
      w-full
      text-gray-700
      placeholder-gray-500
      bg-white
      focus:outline-none
    "
    v-model="localValue"
    @keypress="onInputKeypress"
  />
</template>

<script>
export default {
  name: 'AppInputNumber',

  props: {
    value: {
      type: [String, Number],
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
    }
  },

  methods: {
    // TODO: we need to prevent user from pasting chars
    onInputKeypress(_e) {
      const e = _e || window.event
      const charCode = e.which ? e.which : e.keyCode

      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault()

        return false
      }

      return true
    }
  }
}
</script>