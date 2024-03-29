<template>
  <div>
    Email
    <a href="mailto:summerprojects@powertochange.org.au"
      >summerprojects@powertochange.org.au</a
    >
    with the following information:
    <ul>
      <li>Project finance CSV file</li>
      <li>Bank statement from the cash card</li>
      <li>
        Date that the remaining Project finances were transferred back to
        National Summer Missions, include the reference used in the transaction.
      </li>
      <li>
        Date of postage, a photo of the postage receipt for reimbursement, your
        bank details
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { createAccount } from '../../../scripts/accounts.js'
import { defineAsyncComponent } from 'vue'
import { saveAs } from 'file-saver'
import jszip from 'jszip'

export default {
  name: 'emailNSP',
  data() {
    return {
      account: '',
      add: false,
    }
  },
  computed: {
    ...mapGetters('projects', ['project']),
    ...mapGetters('auth', ['idToken']),
    ...mapGetters('budgets', ['budgets']),
  },
  methods: {
    createAccount() {
      createAccount(this.$route.params.id, {
        label: this.account,
        type: 'budget',
        balance: 0,
        budget: this.budget,
        category: this.category.id,
        expenses: 0,
        transAwaitingReview: 0,
      })
        .then(() => {
          this.add = false
          this.account = ''
        })
        .catch((err) => {
          console.error(err)
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Error creating account',
          })
        })
    },
    async onZipExport(projectId) {
      if (projectId > '' || true) {
        this.$q.loading.show({
          message: 'Preparing Download',
        })
        this.loading = 0
        // var storageRef = $storage.ref()
        // var projectRef = storageRef
        //   .child('projects')
        //   .child(projectId)
        //   .child('reciepts')
        // const transactions = await firebase.firestore()
        //   .collection(`/projects/${projectId}/transactions`)
        //   .where('receipt', '==', true)
        //   .get()
        // transactions.forEach(async trans => {
        //   const fileName = `${projectId}-${trans.id}.jpg`
        //   const url = await projectRef.child(fileName).getDownloadURL()
        //   console.log(url)
        // })
        const src = `/downloadReceiptsZip/?projectId=${projectId}`
        const options = {
          headers: {
            Authorization: `Bearer ${this.idToken}`,
          },
        }
        let res = await fetch(src, options).catch(() => {
          console.log('error occured')
          this.$q.loading.hide()
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          })
        })
        // console.log(res.status, res)
        let links = await res.json().catch(() => {
          console.log('error occured')
          this.$q.loading.hide()
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          })
        })
        let zip = new jszip()
        let counter = 0
        for (var link in links) {
          counter++
          this.loading = ((counter / Object.keys(links).length) * 100).toFixed(
            2
          )
          this.$q.loading.show({
            message: `Downloading Receipts: ${counter} of ${
              Object.keys(links).length
            } - ${this.loading}%`,
            delay: 0,
          })
          // console.log('Getting Images: ' + this.loading + '%')
          const res = await fetch(links[link][0], {
            // mode: 'no-cors',
            // headers: { 'Access-Control-Allow-Origin': '*' },
            // credentials: 'omit'
          }).catch(() => {
            console.log('error occured')
            this.$q.loading.hide()
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              message: 'Oops, Something went wrong!',
            })
          })
          // console.log(await res.blob())
          zip.file(
            link,
            await res.blob().catch(() => {
              console.log('error occured')
              this.$q.loading.hide()
              this.$q.notify({
                color: 'negative',
                textColor: 'white',
                icon: 'error',
                message: 'Oops, Something went wrong!',
              })
            })
          )
        }
        this.$q.loading.show({
          message:
            'Zipping everything up, depending on the number of receipts this may take a few minutes. Do not leave this page or refresh',
          delay: 0,
        })
        // console.log('Getting Images: ' + this.loading + '%')

        const blob = await zip
          .generateAsync(
            {
              type: 'blob',
            },
            (metadata) => {
              this.$q.loading.show({
                message: `Zipping File: ${metadata.currentFile} - ${metadata.percent}% `,
                delay: 0,
              })
            }
          )
          .catch(() => {
            console.log('error occured')
            this.$q.loading.hide()
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              message: 'Oops, Something went wrong!',
            })
          })
        this.$q.loading.show({
          message: 'Saving File',
          delay: 0,
        })
        saveAs(blob, `${this.project.number}-${this.project.name}.zip`)
        this.$q.loading.hide()
        this.$q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'cloud_download',
          message: '.zip Export Successful',
        })
      }
      this.$q.loading.hide()
    },
    async onCSVExport(projectId) {
      this.$q.loading.show({
        message: 'Preparing Download',
      })
      // console.log(projectId, this.idToken)
      if (projectId > '') {
        const src = `/downloadCSV/?projectId=${projectId}`
        const options = {
          headers: {
            Authorization: `Bearer ${this.idToken}`,
          },
        }
        let res = await fetch(src, options).catch(() => {
          console.log('error occured')
          this.$q.loading.hide()
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          })
        })
        // console.log(res.status)
        let blob = await res.blob()
        // console.log(blob)
        saveAs(blob, `${this.project.number}-${this.project.name}.csv`)
        this.$q.loading.hide()
        this.$q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'cloud_download',
          message: '.CSV Export Successful',
        })
      }
      this.$q.loading.hide()
    },
  },
  components: {
    'sp-delete-btn': defineAsyncComponent(() =>
      import('../../sp-delete-btn.vue')
    ),
  },
}
</script>
