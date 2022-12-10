<template>
  <div class="w-full">
    <label
      v-if="label"
      id="app-multiselect"
      class="block text-sm font-medium text-gray-700"
      >{{ label }}</label
    >
    <div class="relative mt-1" @click="onClickShowMenu">
      <button
        type="button"
        class="
          relative
          w-full
          rounded-md
          border border-gray-300
          bg-white
          py-2
          pl-3
          pr-10
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
        <div class="flex items-center flex-wrap gap-1">
          <span
            v-for="(item, itemIndex) in selectedItems"
            :key="itemIndex"
            class="
              px-4
              py-1
              rounded-full
              text-gray-500
              bg-gray-200
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
            {{ item.name }}
            <button
              class="bg-transparent hover focus:outline-none"
              @click="onClickRemoveItem(item.id)"
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

          <input
            v-model="searchQuery"
            class="
              h-8
              ml-3
              focus:border-0 focus:ring-opacity-0 focus:outline-none
            "
            :placeholder="placeholder"
          />
        </div>

        <span
          class="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            ml-3
            flex
            items-center
            pr-2
          "
        >
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <ul
        v-if="menuVisible"
        class="
          absolute
          z-10
          mt-1
          max-h-56
          w-full
          overflow-auto
          rounded-md
          bg-white
          py-1
          text-base
          shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none
          sm:text-sm
        "
        tabindex="-1"
        role="listbox"
        aria-labelledby="app-multiselect"
        aria-activedescendant="listbox-option-3"
      >
        <li
          v-for="(item, itemIndex) in searchedItems"
          :key="itemIndex"
          class="
            text-gray-900
            relative
            cursor-pointer
            select-none
            py-2
            pl-3
            pr-9
            hover:bg-indigo-50
          "
          id="listbox-option-0"
          role="option"
          @click="onClickListItem(item)"
        >
          {{ item.name }}
        </li>

        <li
          v-if="!searchedItems.length"
          class="text-gray-400 select-none py-2 pl-3 pr-9 text-center"
        >
          There is no items.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppMultiSelect',

  props: {
    value: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    titleKey: {
      type: String,
      default: 'name'
    }
  },

  data: () => ({
    menuVisible: false,
    searchQuery: null
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
    notSelectedItems() {
      return this.items.filter((item) => !this.localValue.includes(item.id))
    },
    searchedItems() {
      if (!this.searchQuery) {
        return this.notSelectedItems
      }

      return this.notSelectedItems.filter((item) =>
        item.name
          .toLocaleLowerCase()
          .includes(this.searchQuery.toLocaleLowerCase())
      )
    },
    selectedItems() {
      return this.items.filter((item) => this.localValue.includes(item.id))
    }
  },

  mounted() {
    document.addEventListener('click', this.onClickOutside)
  },

  destroyed() {
    document.removeEventListener('click', this.onClickOutside)
  },

  methods: {
    onClickOutside(e) {
      if (!e.composedPath().includes(this.$el)) {
        this.menuVisible = false
      }
    },
    onClickShowMenu() {
      this.menuVisible = true

      this.$el.querySelector('input').focus()
    },
    onClickListItem(item) {
      this.localValue.push(item.id)
    },
    onClickRemoveItem(itemId) {
      this.$set(
        this,
        'localValue',
        this.localValue.filter((id) => id !== itemId)
      )
    }
  }
}
</script>