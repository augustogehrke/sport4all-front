<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action @click="toMapPage">
            <v-icon color="green darken-2" large>mdi-google-maps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="toMapPage">Mapa</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action @click="toSponsorsPage">
            <v-icon color="orange darken-2" large>mdi-account-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="toSponsorsPage">Patrocinadores</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action @click="logout">
            <v-icon color="red darken-2" large>mdi-account-arrow-right-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="logout">Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Unindo atletas por uma paixão</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">SprintIN &copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app-layout',
  props: {
    source: String
  },
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    toSponsorsPage () {
      this.$router.push({ name: 'sponsors' })
    },
    toMapPage () {
      this.$router.push({ name: 'maps' })
    },
    async logout () {
      this.$firebase.logout()
      this.$store.commit('setName', null)
      this.$store.commit('setPhoto', null)
      this.$store.commit('setToken', null)
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

