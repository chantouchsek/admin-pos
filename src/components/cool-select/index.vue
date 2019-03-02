<template>
  <div ref="IZ-select" class="IZ-select" tabindex="0" @keydown.up="onSelectByArrow"
       @keydown.down="onSelectByArrow"
       @keydown.enter="onEnter"
       @keydown.tab.esc="setBlured"
       @mousedown="onClick"
       @click="setFocused"
  >
    <div ref="IZ-select__input"
         :class="{
          'IZ-select__input': true,
          'IZ-select__input--focused': focused,
          'IZ-select__input--has-menu': hasMenu,
          'IZ-select__input--has-error': hasError,
          'IZ-select__input--selection-slot': showSelectionSlot,
          'IZ-select__input--disabled': disabled,
          'IZ-select__input--readonly': readonly
        }">
      <slot v-if="showSelectionSlot" :item="selectedItem" name="selection"/>

      <input ref="IZ-select__input-for-text" v-bind="inputElCustomAttributes" :value="inputValue"
             :placeholder="placeholder"
             :style="inputForTextStyles"
             :disabled="disableSearch || disabled"
             :readonly="readonly"
             type="text"
             role="combobox"
             autocomplete="off"
             @blur="hideMenu"
             @keyup="onSearchKeyUp"
             @keydown="onSearchKeyDown"
             @input="onSearch"
             class="form-control is-valid"
      >
    </div>

    <transition name="fade">
      <div v-if="hasMenu" ref="IZ-select__menu" :style="menuDynamicStyles"
           :class="{
              'IZ-select__menu': true,
              'IZ-select__menu--disable-search': disableSearch
            }"
           @scroll="onScroll">
        <div v-for="(item, i) in itemsComputed"
             v-if="i < itemsLimit"
             :key="'IZ-item-' + i"
             :class="{
                'IZ-select__item': true,
                'IZ-select__item--selected': isItemSelected(item)
              }"
             @click="onClickSelectItem(item)">
          <slot :item="item" name="item">
            <span>
              {{ getItemText(item) }}
            </span>
          </slot>
        </div>
        <div v-if="!itemsComputed.length && !loading" class="IZ-select__no-data">
          <slot name="no-data">
            No data available
          </slot>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-show="errorMessage" class="IZ-select__error">
        <slot :errorMessage="errorMessage" name="error">
          {{ errorMessage }}
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import { isObject, getOffsetSum } from './helpers'
  import eventsListeners from './eventsListeners'
  import props from './props'
  import computed from './computed'

  export default {
    name: 'VueSelect',
    introduction: 'an amazing select',
    description: 'Good job.',
    token: `<vue-select v-model="selected" :items="items"/>`,
    props,
    data: () => ({
      wishShowMenu: false,
      arrowsIndex: null,
      focused: false,
      selectedItem: null,
      selectedItemByArrows: null,
      itemsLimit: 20,
      search: ''
    }),
    computed,
    watch: {
      value () {
        this.setSelectedItemByValue()
      },
      items () {
        this.setSelectedItemByValue()
      },
      selectedItem () {
        this.selectedItemByArrows = null
        this.$emit('input', this.currentItemValue)
      }
    },
    created () {
      this.setSelectedItemByValue()
      // listener for window
      window.addEventListener('mousedown', ({ target }) => {
        const select = this.$refs['IZ-select']
        if (this.focused && select && !select.contains(target)) {
          this.setBlured()
        }
      })
    },
    methods: {
      ...eventsListeners,
      setInputFocused () {
        this.$refs['IZ-select__input-for-text'].focus()
      },
      setFocused () {
        if (this.focused || this.disabled || this.readonly) return
        // if search enabled
        if (!this.disableSearch) {
          // focus text input
          this.setInputFocused()
        }
        if (this.allowMobileScroll && this.isMobile) {
          const { top } = getOffsetSum(this.$refs['IZ-select__input'])
          // scroll to component input el
          window.scrollTo({
            top: top - 8,
            behavior: 'smooth'
          })
        }
        this.focused = true
        this.showMenu()
        this.$emit('focus')
      },
      setBlured () {
        if (this.resetSearchOnBlur) {
          this.search = ''
        }
        this.focused = false
        this.hideMenu()
        this.$refs['IZ-select__input-for-text'].blur()
        this.$emit('blur')
      },
      fireSelectEvent (item) {
        this.selectedItemByArrows = null
        this.$nextTick(() => {
          this.$emit('select', item)
        })
      },
      getItemText (item) {
        if (!item) return null
        if (this.itemText) return item[this.itemText]
        const keys = Object.keys(item)
        if (keys.length === 1) {
          return item[keys[0]]
        }
        return item
      },
      getItemValue (item) {
        if (!item) return null
        if (this.itemValue) return item[this.itemValue]
        const keys = Object.keys(item)
        if (keys.length === 1) {
          return item[keys[0]]
        }
        return item
      },
      setSelectedItemByValue () {
        if (!this.items.length) return
        this.selectedItem = this.itemsComputed.find(i => {
          if (isObject(this.value)) {
            const valFromObjVal = this.getItemValue(this.value)
            return this.getItemValue(i) === valFromObjVal
          }
          return this.getItemValue(i) === this.value
        })
      },
      filteredBySearchItems (items) {
        if (!this.search || this.disableFilteringBySearch) return items
        return items.filter(i =>
          this.filter(i, this.search, this.getItemText(i))
        )
      },
      isItemSelected (item) {
        return item === this.selectedItemByArrows || (item === this.selectedItem && !this.selectedItemByArrows)
      },
      showMenu () {
        if (this.hasMenu) return
        this.wishShowMenu = true
      },
      hideMenu () {
        if (!this.hasMenu) return
        this.wishShowMenu = false
      }
    }
  }
</script>
