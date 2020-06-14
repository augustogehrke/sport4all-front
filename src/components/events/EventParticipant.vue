<template>
  <v-col cols="12">
    <div>
      <strong> 6 participantes confirmados </strong><br><br>
    </div>
    <v-avatar v-for="(participant, index) in participants" :key="index">
      <img :src="participant.photoURL">
    </v-avatar>
  </v-col>
</template>

<script>
import participants from '@/utils/participants'
export default {
  name: 'event-participant',
  data () {
    return {
      participants: []
    }
  },
  props: {
    eventId: null
  },
  mounted () {
    // TO DO: Buscar os participantes do evento
    this.participants = participants
  },
  watch: {
    eventId: function (newId, oldId) {
      if (newId) {
        // TO DO: Buscar os participantes do evento
      }
    }
  }
}
</script>

<style >

</style>
