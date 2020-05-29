<template>
  <div>
    <v-text-field
      label="Escreva aqui a cidade que busca"
      v-model="filters.name"
      @keyup.enter="filter"
      hide-details="auto"
    />
    <div ref="googleMaps" class="App"/>
    <v-app
      id="inspire"
      v-if="dialog"
    >
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Informações do evento</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Nome" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      hint="Vamos meter ficha"
                      :items="['0-17', '18-29', '30-54', '54+']"
                      label="Distância (KM)"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="['Pedalada', 'Corrida']"
                      label="Tipo"
                      multiple
                    />
                  </v-col>
                  <v-col cols="12" sm=6>
                    <v-dialog
                      ref="dataDialog"
                      v-model="dateModal"
                      :return-value.sync="date"
                      persistent
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="date"
                          label="Data"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-if="dateModal"
                        v-model="date"
                      >
                        <v-spacer />
                        <v-btn
                          text
                          color="primary"
                          @click="dateModal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dataDialog.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="12" sm=6>
                    <v-dialog
                      ref="timeDialog"
                      v-model="timeModal"
                      :return-value.sync="time"
                      persistent
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="time"
                          label="Horário"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-time-picker
                        v-if="timeModal"
                        v-model="time"
                      >
                        <v-spacer />
                        <v-btn
                          text
                          color="primary"
                          @click="timeModal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.timeDialog.save(time)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text @click="dialog = false"
              >
                Fechar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text @click="addMarker"
              >
                Criar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import gmapsInit from '@/utils/gmaps'
import Vue from 'vue'
import VueGeolocation from 'vue-browser-geolocation'
Vue.use(VueGeolocation)
export default {
  name: 'Maps',
  data () {
    return {
      events: [],
      dialog: false,
      google: null,
      map: null,
      geocoder: null,
      filters: {
        name: null
      },
      newEvent: null,
      dateModal: false,
      timeModal: false,
      date: null,
      time: null
    }
  },
  methods: {
    async filter () {
      this.geocoder.geocode({ address: this.filters.name }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status)
        }

        this.map.setCenter(results[0].geometry.location)
        this.map.fitBounds(results[0].geometry.viewport)
      })
    },
    async openModal (event) {
      this.newEvent = event
      this.dialog = true
    },
    async addMarker () {
      const icon = '../../static/img/bike.png'
      const lat = this.newEvent.latLng.lat()
      const lng = this.newEvent.latLng.lng()
      const markerCreated = new this.google.maps.Marker({position: { lat, lng }, icon, title: 'Pedal do Pedrão'})
      markerCreated.setMap(this.map)

      this.dialog = false
      this.google.maps.event.addDomListener(markerCreated, 'click', this.openEvent)
    },
    async openEvent (event) {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      console.log(lat)
      console.log(lng)
      // buscar no array events as informações
    }
  },
  async mounted () {
    try {
      this.google = await gmapsInit()
      this.geocoder = new this.google.maps.Geocoder()
      const googleMaps = this.$refs.googleMaps

      const myOptions = {
        zoom: 12,
        disableDoubleClickZoom: true
      }

      this.map = new this.google.maps.Map(googleMaps, myOptions)

      const options = { enableHighAccuracy: true }
      const { lat, lng } = await this.$getLocation(options).then(coordinates => {
        return coordinates
      })

      const myPlace = new this.google.maps.LatLng(lat, lng)
      this.map.setCenter(myPlace)

      this.map.addListener('dblclick', this.openModal)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.App {
  width: 99vw;
  height: 84vh;
}
</style>
