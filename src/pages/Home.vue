<template>
  <div>
    <nav
      class="
        bg-white
        px-2
        sm:px-4
        py-5
        fixed
        w-full
        z-1
        top-0
        left-0
        border-b border-gray-200
      "
    >
      <div
        class="container flex flex-wrap items-center justify-between mx-auto"
      >
        <router-link to="/" class="flex items-center">
          <span class="self-center text-xl font-semibold whitespace-nowrap"
            >Reservations</span
          >
        </router-link>
        <div class="flex md:order-2">
          <AppDisableReservations
            :branches="branches"
            :disabled="!acceptsReservationsBranches.length"
            @success="loadBranches"
          />
        </div>
      </div>
    </nav>

    <div class="pt-24">
      <AppCard>
        <div class="flex justify-end mb-4">
          <AddBranches :branches="branches" @success="loadBranches" />
        </div>

        <template v-if="clickedItem && showEditDialog">
          <AppEditBranch
            v-model="showEditDialog"
            :branch="clickedItem"
            @success="loadBranches"
          />
        </template>

        <AppDataTable
          :items="dataTableItems"
          :columns="columns"
          item-clickable
          @item-clicked="onClickItem"
        >
          <template slot="data.reservation_duration" slot-scope="{ item }">
            {{ item.reservation_duration }} Minutes
          </template>
        </AppDataTable>
      </AppCard>
    </div>
  </div>
</template>

<script>
import { api } from '@/api'
import AppCard from '@/components/AppCard'
import AppDataTable from '@/components/AppDataTable'
import AddBranches from '@/templates/AddBranches'
import AppEditBranch from '@/templates/AppEditBranch'
import AppDisableReservations from '@/templates/AppDisableReservations'

export default {
  name: 'HomePage',

  components: {
    AppCard,
    AppDataTable,
    AddBranches,
    AppEditBranch,
    AppDisableReservations
  },

  data: () => ({
    clickedItem: null,
    showEditDialog: false,
    columns: [
      { key: 'name', title: 'Branch' },
      { key: 'reference', title: 'Reference' },
      { key: 'number_of_tables', title: 'Number of Tables' },
      { key: 'reservation_duration', title: 'Reservation Duration' }
    ],
    branches: []
  }),

  computed: {
    acceptsReservationsBranches() {
      return this.branches.filter(
        ({ accepts_reservations }) => accepts_reservations
      )
    },
    dataTableItems() {
      return this.acceptsReservationsBranches.map((branch) => ({
        ...branch,
        number_of_tables: branch.sections.reduce(
          (result, section) =>
            result +
            section.tables.filter(
              ({ accepts_reservations }) => accepts_reservations
            ).length,
          0
        )
      }))
    }
  },

  created() {
    this.loadBranches()
  },

  methods: {
    async loadBranches() {
      try {
        const { data } = await api.get(
          '/branches?include[0]=sections&include[1]=sections.tables'
        )

        this.$set(this, 'branches', data.data)
      } catch (e) {
        // const message = e?.message
        // TODO: show alert that api is failed
        // We might empty the branches array
      }
    },

    onClickItem(item) {
      this.showEditDialog = true
      this.clickedItem = item
    }
  }
}
</script>
