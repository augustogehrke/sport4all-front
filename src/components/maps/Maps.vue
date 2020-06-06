<template>
  <div>
    <filters-map :filters="filters"/>
    <v-text-field
      label="Cidade desejada"
      v-model="city"
      @keyup.enter="filter"
      hide-details="auto"
    />
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
            <card-event-form :event="event"/>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text @click="dialog = false"
              >
                Fechar
              </v-btn>
              <v-btn
                v-show="event.id"
                color="blue darken-1"
                text @click="deleteEvent"
              >
                Excluir
              </v-btn>
              <v-btn
                v-show="!event.id"
                :disabled="!formValid"
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
import styleMaps from '@/utils/styleMaps'
import FiltersMap from './FiltersMap'
import CardEventForm from './CardEventForm'

export default {
  name: 'maps',
  components: {
    FiltersMap,
    CardEventForm
  },
  data () {
    return {
      event: {
        id: null,
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
        },
        googleMapsMarker: null
      },
      allEvents: [],
      dialog: false,
      google: null,
      map: null,
      geocoder: null,
      filters: {
        pace: null,
        type: null,
        distance: null
      },
      city: null,
      newMapsEvent: null
    }
  },
  computed: {
    formValid () {
      if (this.event.title && this.event.distance && this.event.type && this.event.pace && this.event.date && this.event.time) {
        return true
      }
      return false
    }
  },
  methods: {
    async filter () {
      this.geocoder.geocode({ address: this.city }, (results, status) => {
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

      this.google.maps.event.addDomListener(markerCreated, 'click', this.openEvent)

      this.event.googleMapsMarker = markerCreated
      this.event.position = { lat, lng }
      this.event.id = 6
      this.allEvents.push(this.event)
      // Adicionar o evento no banco de dados
      this.resetEvent()
      this.dialog = false
    },
    async resetEvent () {
      this.event = {
        id: null,
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
        },
        googleMapsMarker: null
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
    },
    async deleteEvent () {
      this.dialog = false
      this.event.googleMapsMarker.setMap(null)
      // TO DO: Deletar da lista allEvents e do banco de dados
      this.resetEvent()
    },
    async addEvents () {
      this.allEvents = events
      for (const id in events) {
        const markerCreated = new this.google.maps.Marker(events[id])
        markerCreated.setMap(this.map)
        this.allEvents[id].googleMapsMarker = markerCreated
        this.google.maps.event.addDomListener(markerCreated, 'click', this.openEvent)
      }
    },
    async applyFilters () {
      const events = []
      const nEvent = []
      for (const event of this.allEvents) {
        if (this.filters.type === 'Pedalada' || this.filters.type === 'Corrida') {
          if (event.type !== this.filters.type) {
            nEvent.push(event)
            continue
          }
        }
        if (this.filters.pace === 'Leve' || this.filters.pace === 'Moderado' || this.filters.pace === 'Acelerado') {
          if (event.pace !== this.filters.pace) {
            nEvent.push(event)
            continue
          }
        }
        if (this.filters.distance === '0-6' || this.filters.distance === '7-17' || this.filters.distance === '18-29' || this.filters.distance === '30-54' || this.filters.distance === '54+') {
          if (event.distance !== this.filters.distance) {
            nEvent.push(event)
            continue
          }
        }

        events.push(event)
      }

      for (const event of events) {
        event.googleMapsMarker.setMap(this.map)
      }

      for (const event of nEvent) {
        event.googleMapsMarker.setMap(null)
      }
    }
  },
  watch: {
    filters: {
      deep: true,
      handler () {
        this.applyFilters()
      }
    }
  },
  async mounted () {
    try {
      this.google = await gmapsInit()
      this.geocoder = new this.google.maps.Geocoder()
      const googleMaps = this.$refs.googleMaps

      const myOptions = {
        zoom: 12,
        disableDoubleClickZoom: true,
        styles: styleMaps
      }

      this.map = new this.google.maps.Map(googleMaps, myOptions)
      this.map.addListener('dblclick', this.openModal)

      // Adiciona SM como centro do mapa
      const myPlace = new this.google.maps.LatLng(-29.690079577978533, -53.787586782282276)
      this.map.setCenter(myPlace)

      // Pega a localização atual quando permitido
      this.currentLocation()

      this.addEvents()
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
