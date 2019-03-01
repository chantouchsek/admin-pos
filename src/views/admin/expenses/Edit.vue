<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        <strong>Expense Edit </strong>
        <small>Form</small>
      </div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" @keydown="$errors.onKeydown($event)">
        <b-form-group label="Date:"
                      label-for="date"
                      :invalid-feedback="$errors.first('date')"
                      :state="!$errors.has('date')"
        >
          <date-time-picker v-model="form.date"
                            clearable
                            name="date"
                            format="DD-MM-YYYY HH:mm:ss"
          ></date-time-picker>

        </b-form-group>

        <b-form-group label="Amount:"
                      label-for="amount"
                      :invalid-feedback="$errors.first('amount')"
                      :state="!$errors.has('amount')"
        >
          <b-form-input id="amount"
                        type="text"
                        v-model="form.amount"
                        :state="!$errors.has('amount')"
                        placeholder="Enter amount"
                        name="amount"
          >
          </b-form-input>

        </b-form-group>

        <b-form-group label="Reference:"
                      label-for="reference"
                      :invalid-feedback="$errors.first('reference')"
                      :state="!$errors.has('reference')"
        >
          <b-form-input id="reference"
                        type="text"
                        v-model="form.reference"
                        :state="!$errors.has('reference')"
                        placeholder="Enter reference"
                        name="reference"
          >
          </b-form-input>

        </b-form-group>

        <b-form-group label="Attachments:"
                      label-for="attachments"
                      :invalid-feedback="$errors.first('attachments')"
                      :state="!$errors.has('attachments')"
        >
          <b-form-file @change="handleFileSelect"
                       placeholder="Choose a file..."
                       drop-placeholder="Drop file here..."
                       :state="!$errors.has('attachments')"
                       multiple
                       name="attachments"
          />
        </b-form-group>

        <b-form-group label="Notes:"
                      label-for="description"
                      :invalid-feedback="$errors.first('notes')"
                      :state="!$errors.has('notes')"
        >
          <vue-editor v-model="form.notes"
                      :editorToolbar="defaultToolbar"
                      placeholder="Enter notes..."
                      name="notes"
          ></vue-editor>
        </b-form-group>

        <v-button @click="goBack"></v-button>

      </b-form>
    </b-card>
  </div>
</template>

<script>
  import ExpenseProxy from '@/proxies/ExpenseProxy'
  import ExpenseTransformer from '@/transformers/ExpenseTransformer'
  import DefaultToolbar from '@/utilities/editor/default-toolbar'

  const proxy = new ExpenseProxy()

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
    name: 'ExpenseEdit',
    middleware: 'auth',
    metaInfo () {
      return { title: this.$t('settings') }
    },
    scrollToTop: true,
    data () {
      return {
        form: {
          attachments: [],
          notes: '',
          amount: '',
          date: ''
        },
        show: true,
        defaultToolbar: DefaultToolbar
      }
    },
    mounted () {
      this.fetchExpense(this.uuid)
    },
    methods: {
      async onSubmit (evt) {
        evt.preventDefault()
        this.form.date = this.form.date ? this.$moment(this.form.date).format('YYYY-MM-DD HH:mm:ss') : ''
        await this.$store.dispatch('expense/update', this.form)
      },
      onReset (evt) {
        evt.preventDefault();
        this.form.attachments = []
        this.form.notes = ''
        this.form.amount = ''
        this.form.date = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      /**
       * Method used to fetch an expense.
       *
       * @param {groupId|{type, required}} id The id of the expense.
       */
      fetchExpense (id) {
        proxy.find(id)
          .then((data) => {
            this.form = ExpenseTransformer.fetch(data)
            this.show = true
          })
      },
      goBack () {
        this.$router.push({ name: 'expense.index' })
      },
      handleFileSelect (event) {
        /*
          Get the uploaded files from the input.
        */
        let uploadedFiles = event.target.files;

        /*
          Adds the uploaded file to the files array
        */
        for (let i = 0; i < uploadedFiles.length; i++) {
          this.form.attachments.push(uploadedFiles[i]);
        }
      }
    },
    destroyed () {
      this.$errors.flush()
    }
  }
</script>
