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
import api from '@/services/api'
import message from '@/utils/message'
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
    this.getParticipants()
  },
  watch: {
    eventId: function (newId, oldId) {
      this.listParticipants = []
      if (newId) {
        this.getParticipants()
      }
    }
  },
  methods: {
    async getParticipants () {
      try {
        const { data } = await api.get(`/events/${this.eventId}/participants`)
        this.listParticipants = data
      } catch (error) {
        message.error('Não conseguimos buscar os participantes :(')
      }
    },
    async addParticipant () {
      try {
        const { data } = await api.post(`/events/${this.eventId}/participants`, { uid: this.$store.getters.user.uid, photoURL: this.$store.getters.user.photo })
        this.listParticipants.push({ id: data, uid: this.$store.getters.user.uid, photoURL: this.$store.getters.user.photo })
      } catch (error) {
        message.error('Não conseguimos te adicionar na lista :(')
      }
    },
    async removeParticipant () {
      try {
        this.listParticipants.map(async (participant, index) => {
          if (participant.uid === this.$store.getters.user.uid) {
            this.listParticipants.splice(index, 1)
            await api.delete(`/events/${this.eventId}/participants/${participant.id}`)
            message.success('Participação removida :)')
          }
        })
      } catch (error) {
        message.error('Não conseguimos excluir sua participação :(')
      }
    }
  }
}
</script>

<style >

</style>
