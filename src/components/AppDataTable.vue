<template>
  <div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 bg-gray-50">
        <tr>
          <th
            scope="col"
            class="py-3 px-6 border-b border-t"
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>

      <tbody class="text-xs text-gray-700">
        <tr
          v-for="(item, itemIndex) in items"
          :key="itemIndex"
          :class="{ 'cursor-pointer': itemClickable }"
          @click="onClickItem(item)"
        >
          <td
            scope="col"
            class="bg-white border-b py-3 px-6"
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
          >
            <slot :name="`data.${column.key}`" :item="item">
              {{ item[column.key] }}
            </slot>
          </td>
        </tr>

        <tr v-if="!items.length">
          <td :colspan="columns.length" class="text-center py-3">
            There is no items to list.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AppDataTable',

  props: {
    items: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      required: true
    },
    itemClickable: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClickItem(item) {
      this.$emit('item-clicked', item)
    }
  }
}
</script>