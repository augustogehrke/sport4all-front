<template>
  <v-main align="center" class="color">
    <v-img
      class="img"
      src="../../../static/img/login.png"
      max-width="300"
    ></v-img>
    <v-container>
      <v-row>
        <v-col class="space" cols="12" sm="12">
          <v-btn dark large color="#F2FA44" @click="loginGoogle">
            Google
            <v-icon>mdi-google</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="12">
          <v-btn dark large color="#3b5998" @click="loginFacebok">
            Facebook
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import message from '@/utils/message'
export default {
  name: 'login',
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
        message.error()
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
        message.error()
      }
    },
    async toHome () {
      this.$router.push({ name: 'maps' })
    }
  }
}
</script>

<style scoped>
  .img {
    display:inline-block;
    margin-top: 100px;
  }
  .space {
    margin-top: 50px;
  }
  .color {
    background:white;
    width: 100vw;
    height: 100vh;
  }
</style>
