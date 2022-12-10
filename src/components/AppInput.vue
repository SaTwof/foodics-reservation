<template>
  <div>
    <label class="block text-sm font-medium text-gray-600">
      <span v-if="label"> {{ label }}</span>
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <input
      class="
        block
        w-full
        px-4
        py-2
        mt-2
        text-gray-700
        placeholder-gray-500
        bg-white
        border
        rounded-lg
        focus:border-blue-400
        focus:ring-opacity-40
        focus:outline-none
        focus:ring
        focus:ring-blue-300
      "
      v-model="localValue"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: 'AppInput',

  props: {
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
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
  }
}
</script>