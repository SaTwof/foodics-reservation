<template>
  <AppButton
    color="primary"
    class="w-44"
    :loading="loading"
    :disabled="loading || disabled"
    @click.native="onClickSaveBranches"
  >
    Disable Reservations
  </AppButton>
</template>

<script>
import { api } from '@/api'
import AppButton from '@/components/AppButton'

export default {
  name: 'AppDisableReservations',

  components: {
    AppButton
  },

  props: {
    branches: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    loading: false
  }),

  methods: {
    async onClickSaveBranches() {
      this.loading = true

      const promises = this.branches.map(({ id }) =>
        api.put(`/branches/${id}`, {
          accepts_reservations: false
        })
      )

      await Promise.allSettled(promises)

      this.loading = false

      this.$emit('success')
    }
  }
}
</script>