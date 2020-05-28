<template>
  <div>
    <input type="text" v-model="filters.name" @keyup.enter="filter">
    <div ref="googleMaps" class="App"/>
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
      google: null,
      map: null,
      geocoder: null,
      filters: {
        name: null
      }
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
    }
  },
  async mounted () {
    try {
      this.google = await gmapsInit()
      this.geocoder = new this.google.maps.Geocoder()
      const googleMaps = this.$refs.googleMaps

      const myOptions = {
        zoom: 12
      }

      this.map = new this.google.maps.Map(googleMaps, myOptions)

      const marker = new this.google.maps.Marker({ position: { lat: -29.6814, lng: -53.8008 }, icon: '../../static/img/bicycle1.png', title: 'Pedal do Gutão' })
      marker.setMap(this.map)
      const marker2 = new this.google.maps.Marker({ position: { lat: -29.6929, lng: -53.8003 }, icon: '../../static/img/bicycle1.png', title: 'Pedal do Gutão' })
      marker2.setMap(this.map)
      const marker3 = new this.google.maps.Marker({ position: { lat: -29.6919, lng: -53.8203 }, icon: '../../static/img/bicycle1.png', title: 'Pedal do Gutão' })
      marker3.setMap(this.map)
      const marker4 = new this.google.maps.Marker({ position: { lat: -29.6979, lng: -53.8403 }, icon: '../../static/img/bicycle1.png', title: 'Pedal do Gutão' })
      marker4.setMap(this.map)
      const marker5 = new this.google.maps.Marker({ position: { lat: -29.6879, lng: -53.8503 }, icon: '../../static/img/bicycle1.png', title: 'Pedal do Gutão' })
      marker5.setMap(this.map)

      const options = { enableHighAccuracy: true }
      const coordinates = await this.$getLocation(options).then(coordinates => {
        return coordinates
      })

      const myPlace = new this.google.maps.LatLng(coordinates.lat, coordinates.lng)
      this.map.setCenter(myPlace)
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
  width: 100vw;
  height: 88vh;
}
</style>
