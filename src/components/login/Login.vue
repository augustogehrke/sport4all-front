<template>
  <v-row align="center">
    <v-col class="text-center" cols="12">
      <div class="my-2">
        <v-btn dark large color="yellow" @click="loginGoogle">
           Google
           <v-icon>mdi-google</v-icon>
        </v-btn>
      </div>
      <div class="my-2">
        <v-btn dark large color="#3b5998" @click="loginFacebok">
           Facebook
           <v-icon>mdi-facebook</v-icon>
        </v-btn>
      </div>
    </v-col>
    <message ref="message"/>
  </v-row>
</template>

<script>
import Message from '../Message'
export default {
  name: 'login',
  components: {
    Message
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    async loginGoogle () {
      try {
        const { user } = await this.$firebase.loginGoogle()
        this.$store.commit('setName', user.displayName)
        this.$store.commit('setPhoto', user.photoURL)
        this.$store.commit('setUid', user.uid)
        const token = await this.$firebase.getTokenFirebase()
        this.$store.commit('setToken', token)
        this.toHome()
      } catch (error) {
        this.$refs.message.text = 'Oops, ocorreu um problema :('
        this.$refs.message.color = 'error'
        this.$refs.message.show = true
      }
    },
    async loginFacebok () {
      try {
        const { user } = await this.$firebase.loginFacebook()
        this.$store.commit('setName', user.displayName)
        this.$store.commit('setPhoto', user.photoURL)
        this.$store.commit('setUid', user.uid)
        const token = await this.$firebase.getTokenFirebase()
        this.$store.commit('setToken', token)
        this.toHome()
      } catch (error) {
        this.$refs.message.text = 'Oops, ocorreu um problema :('
        this.$refs.message.color = 'error'
        this.$refs.message.show = true
      }
    },
    async toHome () {
      this.$router.push({ name: 'maps' })
    }
  }
}
</script>

<style scoped>

</style>
