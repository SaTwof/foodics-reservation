<template>
  <AppDialog
    v-model="localValue"
    :persistence="disableReservationLoading || updateBranchLoading"
    :title="title"
  >
    <div
      class="
        py-2
        px-3
        bg-blue-200
        text-blue-600
        border-t border-b border-blue-400
      "
    >
      Branch working hours are {{ branch.opening_from }} -
      {{ branch.opening_to }}
    </div>

    <div class="py-3">
      <AppInput
        v-model="reservationDuration"
        label="Reservation Duration (minutes)"
        required
      />
    </div>

    <div class="py-3">
      <AppMultiSelect
        v-model="selectedTables"
        label="Tables"
        placeholder="Search..."
        :items="branchTables"
      />
    </div>

    <div class="py-3">
      <AppReservationTimes
        v-model="reservationTimes"
        label="Tables"
        placeholder="Search..."
        :items="branchTables"
      />
    </div>

    <div class="flex justify-between pt-6">
      <AppButton
        color="error"
        class="w-34"
        :loading="disableReservationLoading"
        :disabled="updateBranchLoading || disableReservationLoading"
        @click.native="onClickDisableReservation"
      >
        Disable Reservations
      </AppButton>

      <div>
        <AppButton
          :disabled="updateBranchLoading || disableReservationLoading"
          @click.native="onClickCloseDialog"
        >
          Close
        </AppButton>

        <AppButton
          color="primary"
          class="ml-3"
          :loading="updateBranchLoading"
          :disabled="updateBranchLoading || disableReservationLoading"
          @click.native="onClickSaveBranch"
        >
          Save
        </AppButton>
      </div>
    </div>
  </AppDialog>
</template>

<script>
import AppInput from '@/components/AppInput'
import AppButton from '@/components/AppButton'
import AppMultiSelect from '@/components/AppMultiSelect'
import AppDialog from '@/components/AppDialog'
import AppReservationTimes from '@/components/AppReservationTimes'
import { api } from '@/api'

export default {
  name: 'AppEditBranch',

  components: {
    AppInput,
    AppButton,
    AppMultiSelect,
    AppReservationTimes,
    AppDialog
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    branch: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    selectedTables: [],
    reservationTimes: {},
    reservationDuration: null,

    updateBranchLoading: false,
    disableReservationLoading: false
  }),

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    title() {
      return `Edit ${this.branch.name} branch reservation settings`
    },
    branchTables() {
      return this.branch.sections.reduce(
        (result, section) => [
          ...result,
          ...section.tables.map((table) => ({
            ...table,
            name: `${section.name} - ${table.name}`
          }))
        ],
        []
      )
    },
    tables() {
      return this.branch.sections.reduce(
        (result, section) => [...result, ...section.tables],
        []
      )
    }
  },

  created() {
    this.setInitialValues()
  },

  methods: {
    onClickCloseDialog() {
      this.localValue = false
    },
    setInitialValues() {
      this.reservationDuration = this.branch.reservation_duration

      this.$set(this, 'reservationTimes', {
        ...(this.branch.reservation_times || {})
      })

      this.$set(
        this,
        'selectedTables',
        this.branch.sections.reduce(
          (result, section) => [
            ...result,
            ...section.tables
              .filter(({ accepts_reservations }) => accepts_reservations)
              .map(({ id }) => id)
          ],
          []
        )
      )
    },
    async handleTableReservations() {
      await Promise.allSettled(
        this.tables
          .filter(
            ({ id, accepts_reservations }) =>
              (!accepts_reservations && this.selectedTables.includes(id)) ||
              (accepts_reservations && !this.selectedTables.includes(id))
          )
          .map(({ id }) =>
            api.put(`/tables/${id}`, {
              accepts_reservations: this.selectedTables.includes(id)
            })
          )
      )
    },
    async onClickSaveBranch() {
      try {
        this.updateBranchLoading = true

        await this.handleTableReservations()

        await api.put(`/branches/${this.branch.id}`, {
          reservation_times: this.reservationTimes,
          reservation_duration: this.reservationDuration
        })
      } catch (e) {
        // TODO: show alert with errors
      } finally {
        this.updateBranchLoading = false

        this.localValue = false

        this.$emit('success')
      }
    },
    async onClickDisableReservation() {
      const tables = this.tables.filter(
        ({ accepts_reservations }) => accepts_reservations
      )

      this.disableReservationLoading = true

      try {
        await Promise.allSettled(
          tables.map(({ id }) =>
            api.put(`/tables/${id}`, {
              accepts_reservations: false
            })
          )
        )

        await api.put(`/branches/${this.branch.id}`, {
          accepts_reservations: false
        })
      } catch (e) {
        // TODO: show alert with errors
      } finally {
        this.localValue = false

        this.disableReservationLoading = false

        this.$emit('success')
      }
    }
  }
}
</script>