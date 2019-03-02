export default {
  itemsComputed () {
    let items = this.items

    if (typeof this.items === 'string') {
      items = JSON.parse(this.items)
    }

    return this.filteredBySearchItems(items)
  },
  inputValue () {
    if (this.$scopedSlots.selection && this.search === '') return ''
    if (this.search !== '') return this.search
    return this.getItemText(this.selectedItem) || this.currentItemValue
  },
  currentItemValue () {
    return this.getItemValue(this.selectedItem)
  },
  showSelectionSlot () {
    return this.$scopedSlots.selection && this.selectedItem && !this.search
  },
  inputForTextStyles () {
    if (this.loading) {
      return {
        'background-image': `url(${this.loadingIndicator})`
      }
    }

    return {}
  },
  hasMenu () {
    return this.wishShowMenu && !this.loading // this.focused && !this.loading
  },
  hasError () {
    return !!this.errorMessage
  },
  isMobile () {
    return window.innerWidth <= 900 && window.innerHeight <= 900
  },
  menuDynamicStyles () {
    let obj = {
      'width': this.$refs['IZ-select__input'].offsetWidth + 'px',
      'pointer-events': !this.hasMenu ? 'none' : 'auto'
    }

    if (this.disableSearch) {
      obj.top = this.$refs['IZ-select__input'].offsetTop + 'px'
    }

    return obj
  },
  // get item index from arr
  selectedItemIndex () {
    for (let itemKey in this.itemsComputed) {
      if (this.selectedItem === this.itemsComputed[itemKey] && this.itemsComputed.hasOwnProperty(itemKey)) {
        return itemKey
      }
    }

    return null
  }
}
