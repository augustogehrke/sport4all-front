import Vue from 'vue'

import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

const toastrConfigs = {
  position: 'top full width',
  closeButton: true,
  showMethod: 'fadeInDown',
  hideMethod: 'fadeOutRight',
  progressBar: true,
  timeOut: 3000,
  showDuration: 200,
  hideDuration: 200
}

Vue.use(CxltToastr, toastrConfigs)

export default new Vue({
  methods: {
    async success (message = null, title = 'Feito campeão') {
      if (!message) {
        message = 'Operação realizada!'
      }

      this.$toast.success({
        title: title,
        message: message
      })
    },
    async error (message = null, title = 'Ooops...') {
      if (!message) {
        message = 'Ocorreu um erro :( Contate o suporte'
      }

      this.$toast.error({
        title: title,
        message: message
      })
    }
  }
})
