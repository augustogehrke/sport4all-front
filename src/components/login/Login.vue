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
  </v-row>
</template>

<script>
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
        const user = await this.$firebase.loginGoogle()
        console.log(user)
        this.toHome()
      } catch (error) {
        alert('deu ruim')
      }
    },
    async loginFacebok () {
      try {
        const user = await this.$firebase.loginFacebook()
        console.log(user)
        this.toHome()
      } catch (error) {
        alert('deu ruim')
      }
    },
    async getTokenFirebase () {
      try {
        const token = await this.$firebase.getTokenFirebase()
        console.log(token)
      } catch (error) {
        alert('deu ruim')
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
