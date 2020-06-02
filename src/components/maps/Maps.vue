<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="4"
        >
          <h2 class="title">Tipo</h2>
          <v-chip-group
            v-model="filters.type"
            column
          >
            <v-chip filter outlined>Pedalada</v-chip>
            <v-chip filter outlined>Corrida</v-chip>
          </v-chip-group>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <h2 class="title">Ritmo</h2>

          <v-chip-group
            v-model="filters.pace"
            column
            multiple
          >
            <v-chip filter outlined>Leve</v-chip>
            <v-chip filter outlined>Moderado</v-chip>
            <v-chip filter outlined>Acelerado</v-chip>
          </v-chip-group>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <h2 class="title">Distância</h2>
          <v-chip-group
            v-model="filters.distance"
            column
            multiple
          >
            <v-chip filter outlined>0-6</v-chip>
            <v-chip filter outlined>7-17</v-chip>
            <v-chip filter outlined>18-29</v-chip>
            <v-chip filter outlined>30-54</v-chip>
            <v-chip filter outlined>54+</v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-text-field
        label="Cidade desejada"
        v-model="filters.city"
        @keyup.enter="filter"
        hide-details="auto"
      />
    </v-container>
    <div ref="googleMaps" class="map"/>
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
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="event.title" label="Nome" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="event.distance"
                      hint="Vamos meter ficha"
                      :items="['0-6', '7-17', '18-29', '30-54', '54+']"
                      label="Distância (KM)"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="event.type"
                      :items="['Pedalada', 'Corrida']"
                      label="Tipo"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      v-model="event.pace"
                      :items="['Leve', 'Moderado', 'Acelerado']"
                      label="Ritmo"
                    />
                  </v-col>
                  <v-col cols="12" sm=6>
                    <v-dialog
                      ref="dataDialog"
                      v-model="dateModal"
                      :return-value.sync="event.date"
                      persistent
                      max-width="290"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="event.date"
                          label="Data"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-if="dateModal"
                        v-model="event.date"
                      >
                        <v-spacer />
                        <v-btn
                          text
                          color="primary"
                          @click="dateModal = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dataDialog.save(event.date)"
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
                      :return-value.sync="event.time"
                      persistent
                      max-width="290"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="event.time"
                          label="Horário"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-time-picker
                        v-if="timeModal"
                        v-model="event.time"
                      >
                        <v-spacer />
                        <v-btn
                          text
                          color="primary"
                          @click="timeModal = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.timeDialog.save(event.time)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="event.observation" rows="3" label="Observação" />
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
import events from '@/utils/markers'
export default {
  name: 'maps',
  data () {
    return {
      event: {
        title: null,
        distance: null,
        type: null,
        pace: null,
        observation: null,
        date: null,
        time: null,
        position: {
          lat: null,
          lng: null
        }
      },
      allEvents: [],
      dialog: false,
      google: null,
      map: null,
      geocoder: null,
      filters: {
        city: null,
        pace: null,
        type: null,
        distance: null
      },
      newMapsEvent: null,
      dateModal: false,
      timeModal: false
    }
  },
  methods: {
    async filter () {
      this.geocoder.geocode({ address: this.filters.city }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status)
        }

        this.map.setCenter(results[0].geometry.location)
        this.map.fitBounds(results[0].geometry.viewport)
      })
    },
    async openModal (event) {
      this.resetEvent()
      this.newMapsEvent = event
      this.dialog = true
    },
    async addMarker () {
      const icon = '../../static/img/bike.png'
      const lat = this.newMapsEvent.latLng.lat()
      const lng = this.newMapsEvent.latLng.lng()
      const markerCreated = new this.google.maps.Marker({ position: { lat, lng }, icon, title: this.event.title })
      markerCreated.setMap(this.map)

      this.dialog = false
      this.google.maps.event.addDomListener(markerCreated, 'click', this.openEvent)
      this.event.position = { lat, lng }
      this.allEvents.push(this.event)
      this.resetEvent()
    },
    async resetEvent () {
      this.event = {
        title: null,
        distance: null,
        type: null,
        pace: null,
        observation: null,
        date: null,
        time: null,
        position: {
          lat: null,
          lng: null
        }
      }
    },
    async openEvent (googleEvent) {
      const lat = googleEvent.latLng.lat()
      const lng = googleEvent.latLng.lng()
      const event = this.allEvents.find(event => {
        return event.position.lat === lat && event.position.lng === lng
      })

      if (event) {
        this.event = event
        this.dialog = true
      } else {
        alert('Evento não encontrado')
      }
    },
    async currentLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.markCurrentLocation)
      } else {
        alert('Geolocalização não suportada nesse navegador.')
      }
    },
    async markCurrentLocation (position) {
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      const myPlace = new this.google.maps.LatLng(lat, lng)
      this.map.setCenter(myPlace)
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
      this.map.addListener('dblclick', this.openModal)

      // Adiciona SM como centro do mapa
      const myPlace = new this.google.maps.LatLng(-29.690079577978533, -53.787586782282276)
      this.map.setCenter(myPlace)

      // Pega a localização atual quando permitido
      this.currentLocation()

      // Adicionando alguns eventos temporários
      this.allEvents = events
      for (const event of events) {
        const markerCreated = new this.google.maps.Marker(event)
        markerCreated.setMap(this.map)
        this.google.maps.event.addDomListener(markerCreated, 'click', this.openEvent)
      }
      // Adicionando alguns eventos temporários
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style scoped>
  .map {
    width: 99vw;
    height: 60vh;
  }
</style>
