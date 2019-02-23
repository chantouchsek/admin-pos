<template>
  <div class="animated fadeIn">
    <b-card
      border-variant="secondary"
      header="User Detail"
      header-bg-variant="secondary"
      header-text-variant="black"
      align="left"
    >
      <b-row>
        <b-col cols="4">
          <div class="profile-card-4">
            <div class="card">
              <div class="card-body text-center bg-css3 rounded-top">
                <div class="user-box">
                  <b-img :src="user.avatarUrl" fluid alt="Responsive image"/>
                </div>
                <h5 class="mb-1 text-white">{{ user.name }}</h5>
                <h6 class="text-light">UI/UX Engineer</h6>
              </div>
              <div class="card-body">
                <ul class="list-group shadow-none">
                  <li class="list-group-item">
                    <div class="list-icon">
                      <i class="fa fa-phone-square"></i>
                    </div>
                    <div class="list-details">
                      <span>{{ user.phoneNumber }}</span>
                      <small>Mobile Number</small>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="list-icon">
                      <i class="fa fa-envelope"></i>
                    </div>
                    <div class="list-details">
                      <span>{{ user.email }}</span>
                      <small>Email Address</small>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="list-icon">
                      <i class="fa fa-globe"></i>
                    </div>
                    <div class="list-details">
                      <span>www.example.com</span>
                      <small>Website Address</small>
                    </div>
                  </li>
                </ul>
                <div class="row text-center mt-4">
                  <div class="col p-2">
                    <h4 class="mb-1 line-height-5">154</h4>
                    <small class="mb-0 font-weight-bold">Projects</small>
                  </div>
                  <div class="col p-2">
                    <h4 class="mb-1 line-height-5">2.2k</h4>
                    <small class="mb-0 font-weight-bold">Followers</small>
                  </div>
                  <div class="col p-2">
                    <h4 class="mb-1 line-height-5">9.1k</h4>
                    <small class="mb-0 font-weight-bold">Views</small>
                  </div>
                </div>
              </div>
              <div class="card-footer text-center">
                <b-button class="mr-1 btn-brand" variant="facebook">
                  <i class="fa fa-facebook"></i>
                </b-button>
                <b-button class="mr-1 btn-brand" variant="google-plus">
                  <i class="fa fa-google-plus"></i>
                </b-button>
                <b-button class="mr-1 btn-brand" variant="behance">
                  <i class="fa fa-behance"></i>
                </b-button>
                <b-button class="mr-1 btn-brand" variant="dribbble">
                  <i class="fa fa-dribbble"></i>
                </b-button>
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="8">
          <div class="card">
            <div class="card-body">
              <b-tabs>
                <b-tab title="Profile" active>
                  <h5 class="mb-3">User Profile</h5>
                  <div class="row">
                    <div class="col-md-6">
                      <h6>About</h6>
                      <p>
                        Web Designer, UI/UX Engineer
                      </p>
                      <h6>Hobbies</h6>
                      <p>
                        Indie music, skiing and hiking. I love the great outdoors.
                      </p>
                    </div>
                    <div class="col-md-6">
                      <h6>Recent badges</h6>
                      <a href="#" class="badge badge-dark badge-pill">html5</a>
                      <a href="#" class="badge badge-dark badge-pill">react</a>
                      <a href="#" class="badge badge-dark badge-pill">codeply</a>
                      <a href="#" class="badge badge-dark badge-pill">angularjs</a>
                      <a href="#" class="badge badge-dark badge-pill">css3</a>
                      <a href="#" class="badge badge-dark badge-pill">jquery</a>
                      <a href="#" class="badge badge-dark badge-pill">bootstrap</a>
                      <a href="#" class="badge badge-dark badge-pill">responsive-design</a>
                      <hr>
                      <span class="badge badge-primary"><i class="fa fa-user"></i> 900 Followers</span>
                      <span class="badge badge-success"><i class="fa fa-cog"></i> 43 Forks</span>
                      <span class="badge badge-danger"><i class="fa fa-eye"></i> 245 Views</span>
                    </div>
                    <div class="col-md-12">
                      <h5 class="mt-2 mb-3"><span class="fa fa-clock-o ion-clock float-right"></span> Recent Activity
                      </h5>
                      <table class="table table-hover table-striped">
                        <tbody>
                        <tr>
                          <td>
                            <strong>Abby</strong> joined ACME Project Team in <strong>`Collaboration`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Gary</strong> deleted My Board1 in <strong>`Discussions`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Kensington</strong> deleted MyBoard3 in <strong>`Discussions`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>John</strong> deleted My Board1 in <strong>`Discussions`</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Skell</strong> deleted his post Look at Why this is.. in
                            <strong>`Discussions`</strong>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </b-tab>
                <b-tab title="Message">
                  <b-alert show dismissible fade>
                    <span><strong>Info!</strong> Lorem Ipsum is simply dummy text.</span>
                  </b-alert>
                  <table class="table table-hover table-striped">
                    <tbody>
                    <tr>
                      <td>
                        <span class="float-right font-weight-bold">3 hrs ago</span> Here is your a link to the latest
                        summary report from the..
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="float-right font-weight-bold">Yesterday</span> There has been a request on your
                        account since that was..
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="float-right font-weight-bold">9/10</span> Porttitor vitae ultrices quis, dapibus id
                        dolor. Morbi venenatis lacinia rhoncus.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="float-right font-weight-bold">9/4</span> Vestibulum tincidunt ullamcorper eros eget
                        luctus.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="float-right font-weight-bold">9/4</span> Maxamillion ais the fix for tibulum
                        tincidunt ullamcorper eros.
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-card-footer footer-border-variant="primary">

        <b-button type="button" variant="primary" class="mr-1" :disabled="$errors.busy" :to="getEditRoute(user.uuid)">
          <i class="fa fa-pencil-square-o"></i> Edit
        </b-button>

        <b-button type="button" variant="warning" @click="goBack" :disabled="$errors.busy">
          <i class="fa fa-arrow-circle-left"></i> Back
        </b-button>

      </b-card-footer>

    </b-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    /**
     * The properties that can be used.
     */
    props: {
      /**
       * The given group identifier.
       */
      uuid: {
        type: [String, Number],
        required: true
      }
    },
    name: 'UserDetail',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    computed: {
      ...mapGetters({ 'user': 'user/detail' })
    },
    data () {
      return {
        //
      }
    },
    methods: {
      goBack () {
        this.$router.push({ name: 'user.index' })
      },
      /**
       * Method used to get the user route.
       *
       * @param {Number} uuid The user identifier.
       *
       * @returns {Object} The user route.
       */
      getEditRoute (uuid) {
        return {
          name: 'user.edit',
          params: { uuid: uuid }
        }
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    async mounted () {
      const vm = this
      await vm.$store.watch((state) => {
        if (state.auth.authenticated) {
          vm.$store.dispatch('user/detail', vm.uuid)
        }
      })
    }
  }
</script>
