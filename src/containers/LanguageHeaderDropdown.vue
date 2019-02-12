<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="fa fa-language"></i>
      <b-badge pill variant="danger">{{ locale }}</b-badge>
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Language</strong></b-dropdown-header>
      <b-dropdown-item @click.prevent="setLocale('en')" :active="locale === 'en'">
        <i class="flag-icon flag-icon-us" title="us" id="us"></i> English
        <b-badge variant="info">English</b-badge>
      </b-dropdown-item>
      <b-dropdown-item @click.prevent="setLocale('km')" :active="locale === 'km'">
        <i class="flag-icon flag-icon-kh" title="kh" id="kh"></i> Khmer
        <b-badge variant="success">ខ្មែរ</b-badge>
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { loadMessages } from '@/plugins/i18n'
  import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'

  export default {
    name: 'LanguageHeaderDropdown',
    components: {
      AppHeaderDropdown
    },
    computed: {
      ...mapGetters({ locale: 'lang/locale' })
    },
    /**
     * The methods which the layout can use.
     */
    methods: {
      /**
       * Method used to set language.
       */
      setLocale (locale) {
        if (this.$i18n.locale !== locale) {
          loadMessages(locale)
          this.$store.dispatch('lang/setLocale', { locale })
        }
      }
    }
  }
</script>
