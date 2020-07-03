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
    <event @add-marker="addMarker" @remove-event-list="removeEventList" :dialog.sync="dialog" :event="event"/>
  </div>
</template>

<script>
import gmapsInit from '@/utils/gmaps'
import styleMaps from '@/utils/styleMaps'
import FiltersMap from './FiltersMap'
import Event from '@/components/events/Event'
import api from '@/services/api'
import message from '@/utils/message'
import MarkerClusterer from '@google/markerclusterer'
export default {
  name: 'maps',
  components: {
    FiltersMap,
    Event
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
        googleMapsMarker: null,
        createdBy: null
      },
      allEvents: [],
      dialog: false,
      idEvent: null,
      google: null,
      map: null,
      markerClusterer: null,
      geocoder: null,
      filters: {
        pace: null,
        type: null,
        distance: null
      },
      city: null
    }
  },
  computed: {
    iconEvent () {
      if (this.event.type === 'Pedalada') {
        return '../../static/img/bike.png'
      }
      return '../../static/img/runner.png'
    }
  },
  methods: {
    async filter () {
      try {
        this.geocoder.geocode({ address: this.city }, (results, status) => {
          if (status !== 'OK' || !results[0]) {
            throw new Error(status)
          }

          this.map.setCenter(results[0].geometry.location)
          this.map.fitBounds(results[0].geometry.viewport)
        })
      } catch (error) {
        message.error()
      }
    },
    async openModal (event) {
      this.resetEvent()
      this.newMapsEvent = event
      this.event.position.lat = event.latLng.lat()
      this.event.position.lng = event.latLng.lng()
      this.event.createdBy = this.$store.getters.user.uid
      this.dialog = true
    },
    async addMarker () {
      try {
        const response = await api.post('/events', {
          createdBy: this.event.createdBy,
          distance: this.event.distance,
          type: this.event.type,
          pace: this.event.pace,
          observation: this.event.observation,
          date: this.event.date,
          time: this.event.time,
          position: this.event.position,
          title: this.event.title
        })

        this.event.id = response.data

        const markerCreated = new this.google.maps.Marker({ position: this.event.position, icon: this.iconEvent, title: this.event.title })
        markerCreated.setMap(this.map)

        this.google.maps.event.addDomListener(markerCreated, 'click', this.openEvent)

        this.event.googleMapsMarker = markerCreated

        this.allEvents.push(this.event)
        this.resetEvent()
        this.dialog = false
        message.success('Evento criado')
      } catch (error) {
        message.error()
      }
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
        googleMapsMarker: null,
        createdBy: null
      }
    },
    async openEvent (googleEvent) {
      try {
        const lat = googleEvent.latLng.lat()
        const lng = googleEvent.latLng.lng()
        const event = this.allEvents.find(event => {
          return event.position.lat === lat && event.position.lng === lng
        })

        if (event) {
          this.dialog = true
          this.event = event
        } else {
          message.error('Evento não encontrado :(')
        }
      } catch (error) {
        message.error()
      }
    },
    async currentLocation () {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.markCurrentLocation)
        } else {
          message.error('Geolocalização não suportada nesse navegador :(')
        }
      } catch (error) {
        message.error()
      }
    },
    async markCurrentLocation (position) {
      try {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        const myPlace = new this.google.maps.LatLng(lat, lng)
        this.map.setCenter(myPlace)
      } catch (error) {
        message.error()
      }
    },
    async addEvents () {
      try {
        const events = this.allEvents
        const listMarkers = []
        for (const id in events) {
          events[id].type === 'Pedalada' ? events[id].icon = '../../static/img/bike.png' : events[id].icon = '../../static/img/runner.png'
          const markerCreated = new this.google.maps.Marker(events[id])
          markerCreated.setMap(this.map)
          listMarkers.push(markerCreated)
          this.allEvents[id].googleMapsMarker = markerCreated
          this.google.maps.event.addDomListener(markerCreated, 'click', this.openEvent)
        }

        this.markerClusterer = new MarkerClusterer(this.map, listMarkers, {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        })
      } catch (error) {
        message.error()
      }
    },
    async applyFilters () {
      try {
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
      } catch (error) {
        message.error()
      }
    },
    async removeEventList () {
      this.allEvents.map((event, index) => {
        if (event.id === this.event.id) {
          this.allEvents.splice(index, 1)
        }
      })
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
      const { data } = await api.get('/events')
      this.allEvents = data

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

      const myPlace = new this.google.maps.LatLng(-29.690079577978533, -53.787586782282276)
      this.map.setCenter(myPlace)

      this.currentLocation()

      this.addEvents()
    } catch (error) {
      message.error()
    }
  }
}
</script>

<style scoped>
  .map {
    width: 100vw;
    height: 63vh;
  }
</style>
