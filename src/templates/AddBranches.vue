<template>
  <div>
    <AppButton @click.native="onToggleBranchesDialog"> Add Branches </AppButton>

    <AppDialog
      v-model="showBranchesDialog"
      title="Add Branches"
      :persistence="addBranchesLoading"
    >
      <div class="flex column w-full">
        <AppMultiSelect
          v-model="selectedBranches"
          label="Branches"
          placeholder="Search..."
          :items="notAcceptsReservationsBranches"
        />
      </div>

      <div class="flex justify-end pt-6">
        <AppButton
          :disabled="addBranchesLoading"
          @click.native="onToggleBranchesDialog"
        >
          Close
        </AppButton>

        <AppButton
          color="primary"
          class="ml-3"
          :loading="addBranchesLoading"
          :disabled="!selectedBranches.length || addBranchesLoading"
          @click.native="onClickSaveBranches"
        >
          Save
        </AppButton>
      </div>
    </AppDialog>
  </div>
</template>

<script>
import { api } from '@/api'
import AppButton from '@/components/AppButton'
import AppDialog from '@/components/AppDialog'
import AppMultiSelect from '@/components/AppMultiSelect'

export default {
  name: 'AddBranches',

  components: {
    AppButton,
    AppDialog,
    AppMultiSelect
  },

  props: {
    branches: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    selectedBranches: [],
    showBranchesDialog: false,
    addBranchesLoading: false
  }),

  computed: {
    notAcceptsReservationsBranches() {
      return this.branches.filter(
        ({ accepts_reservations }) => !accepts_reservations
      )
    }
  },

  methods: {
    onToggleBranchesDialog() {
      this.showBranchesDialog = !this.showBranchesDialog
    },
    async onClickSaveBranches() {
      this.addBranchesLoading = true

      const promises = this.selectedBranches.map((id) =>
        api.put(`/branches/${id}`, {
          accepts_reservations: true
        })
      )

      await Promise.allSettled(promises)

      this.addBranchesLoading = false

      this.selectedBranches = []

      this.showBranchesDialog = false

      this.$emit('success')
    }
  }
}
</script>
