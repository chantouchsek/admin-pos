<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile/>
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/brand/logo.svg" width="89" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg"/>
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <b-nav-item class="px-3">{{ $t("settings") }}</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          {{ currentTime }}
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">{{ unreads.length }}</b-badge>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-location-pin"></i>
        </b-nav-item>
        <LanguageHeaderDropdown/>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <AsideToggler class="d-none d-lg-block"/>
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">

          <transition name="fade">
            <b-alert :show="alert.dismissCountDown"
                     dismissible
                     :variant="alert.type"
                     @dismissed="onDismissed"
                     @dismiss-count-down="countDownChanged"
            >
              {{ alert.message }}
            </b-alert>
          </transition>

          <router-view></router-view>

        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="https://bookingkh.com">BookingKH</a>
        <span class="ml-1">&copy; 2018 booking kh.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://bookingkh.com">Booking Kh</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import nav from '@/_nav'

  import {
    Header as AppHeader,
    SidebarToggler,
    Sidebar as AppSidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNav,
    Aside as AppAside,
    AsideToggler,
    Footer as TheFooter,
    Breadcrumb
  } from '@coreui/vue'
  import DefaultAside from './DefaultAside'
  import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
  import LanguageHeaderDropdown from './LanguageHeaderDropdown'

  export default {
    name: 'DefaultContainer',
    components: {
      AsideToggler,
      AppHeader,
      AppSidebar,
      AppAside,
      TheFooter,
      Breadcrumb,
      DefaultAside,
      DefaultHeaderDropdownAccnt,
      SidebarForm,
      SidebarFooter,
      SidebarToggler,
      SidebarHeader,
      SidebarNav,
      SidebarMinimizer,
      LanguageHeaderDropdown
    },
    data () {
      return {
        nav: nav.items,
        currentTime: null
      }
    },
    computed: {
      name () {
        return this.$route.name
      },
      list () {
        return this.$route.matched.filter((route) => route.name || route.meta.label)
      },
      ...mapGetters({
        'alert': 'application/alert',
        'unreads': 'notification/unreads'
      })
    },
    methods: {
      countDownChanged (dismissCountDown) {
        this.$store.dispatch('application/countDownChanged', dismissCountDown)
      },
      async onDismissed () {
        const vm = this
        await vm.$store.dispatch('application/countDownChanged', 0)
        await vm.$store.dispatch('application/removeAlert')
      },
      updateCurrentTime () {
        this.currentTime = this.$moment().format('LLLL');
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          // vm.$store.dispatch('application/alert')
        }
      })
      this.currentTime = this.$moment().format('LLLL');
      setInterval(() => this.updateCurrentTime(), 1000);
    }
  }
</script>
