<template>
  <v-col cols="12">
    <div>
      <strong> {{ participants.length }} participantes confirmados </strong><br><br>
    </div>
    <v-avatar v-for="(participant, index) in listParticipants" :key="index">
      <img :src="participant.photoURL">
    </v-avatar>
  </v-col>
</template>

<script>
export default {
  name: 'event-participant',
  data () {
    return {
    }
  },
  computed: {
    listParticipants: {
      get () {
        return this.participants
      },
      set (value) {
        this.$emit('update:participants', value)
      }
    }
  },
  props: {
    eventId: null,
    participants: null
  },
  mounted () {
    // TO DO: Buscar os participantes do evento
  },
  watch: {
    eventId: function (newId, oldId) {
      this.listParticipants = []
      if (newId) {
        // TO DO: Buscar os participantes do evento
      }
    }
  },
  methods: {
    addParticipant () {
      // TO DO: Adicionar no banco
      this.listParticipants.push({ uid: this.$store.getters.user.uid, photoURL: this.$store.getters.user.photo })
    },
    removeParticipant () {
      // TO DO: Remover do banco
      this.listParticipants.map((participant, index) => {
        if (participant.uid === this.$store.getters.user.uid) {
          this.listParticipants.splice(index, 1)
        }
      })
    }
  }
}
</script>

<style >

</style>
