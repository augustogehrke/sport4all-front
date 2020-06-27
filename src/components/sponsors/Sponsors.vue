<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-row>
        <v-col cols="12" sm="12">
          <v-card
            max-width="375"
            class="mx-auto"
          >
            <v-img
              :src="item.img"
              height="250px"
              dark
            >
              <!-- <v-row class="fill-height">
                <v-card-title class="white--text pl-12 pt-12">
                  <div class="display-1 pl-12 pt-12">SprintIN</div>
                </v-card-title>
              </v-row> -->
            </v-img>

            <v-list two-line>
              <v-list-item :href="item.site" target="_blank">
                <v-list-item-icon>
                  <v-icon color="blue">mdi-home-search-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.type }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item :href="item.linkWhats" target="_blank">
                <v-list-item-icon>
                  <v-icon color="green">mdi-whatsapp</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.contact }}</v-list-item-title>
                  <v-list-item-subtitle>principal</v-list-item-subtitle>
                </v-list-item-content>
                <!-- <v-list-item-icon>
                  <v-icon>mdi-message-text</v-icon>
                </v-list-item-icon> -->
              </v-list-item>
              <v-list-item :href="item.linkLocation" target="_blank">
                <v-list-item-icon>
                  <v-icon color="yellow">mdi-map-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.address }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.city }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'sponsors',
  components: {
  },
  data () {
    return {
      items: [
        {
          img: '../../../static/img/sprintin.jpg',
          site: 'https://sprintin.com.br',
          contact: '(55) 99649-3396',
          linkWhats: 'https://api.whatsapp.com/send?phone=+5555996493396&text=Ol%C3%A1%2C%20',
          address: 'Rua José Maurício',
          city: 'Camobi, RS',
          linkLocation: 'https://www.google.com.br/maps/@-29.7028508,-53.7093698,21z',
          name: 'SprintIN',
          type: 'Construção de softwares'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
