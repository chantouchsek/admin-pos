<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Username"
                                  v-model="user.username"
                                  autocomplete="username email"></b-form-input>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Password"
                                  v-model="user.password"
                                  autocomplete="current-password"></b-form-input>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" type="submit">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0" @click.prevent="getSelfResetPasswordRoute">Forgot
                        password?
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  export default {
    /**
     * The name of the page
     */
    name: 'login-page',

    middleware: 'guest',

    /**
     * The data of the page can use
     *
     * @return {Object} The data
     */
    data () {
      return {
        user: {}
      }
    },
    metaInfo () {
      return { title: this.$t('login') }
    },
    /**
     * The methods of the page can be used
     */

    methods: {
      /**
       * Method can be used to login the user
       */

      login () {
        this.$store.dispatch('auth/login', this.user)
      },

      removeAlert (alert) {
        this.$store.dispatch('application/removeAlert', alert)
      },

      /**
       * Method used to get the user resetting password route.
       *
       * @returns {Object} The user route.
       */
      getSelfResetPasswordRoute () {
        this.$router.push({
          name: 'PasswordEmail'
        })
      }
    }
  }
</script>
