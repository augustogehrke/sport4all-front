<template>
  <v-dialog v-model="show" persistent max-width="650px">
    <v-card>
      <v-toolbar
        color="blue darken-1"
        dark
        flat
        prominent
        class="not-space"
      >
        <v-tabs
          slot="extension"
          v-model="tabs"
        >
          <v-tab
            :key="1"
          >
            Informações
          </v-tab>
          <!-- <v-tab
            :key="2"
          >
            Chat
          </v-tab> -->
          <v-tab
            :key="2"
          >
            Rota
          </v-tab>
          <v-tab
            :key="3"
          >
            Fotos
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card
            class="mx-auto"
          >
            <event-info :event="event"/>
            <event-participant ref="eventParticipant" :participants.sync="participants" :eventId="event.id"/>
          </v-card>
        </v-tab-item>
        <!-- <v-tab-item>
          <v-card
            class="mx-auto"
          >
            <event-chat/>
          </v-card>
        </v-tab-item> -->
        <v-tab-item>
          <v-card
            class="mx-auto"
          >
            <event-route/>
          </v-card>
        </v-tab-item>
        <v-tab-item>
        <v-card class="mx-auto">
            <event-photo/>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text @click="show = false"
        >
          Fechar
        </v-btn>
        <v-btn
          v-show="event.id && myEvent"
          color="blue darken-1"
          text @click="deleteEvent"
        >
          Excluir
        </v-btn>
        <v-btn
          v-show="event.id && !amParticipant"
          color="blue darken-1"
          text @click="participateEvent"
        >
          Vou junto :)
        </v-btn>
        <v-btn
          v-show="amParticipant"
          color="blue darken-1"
          text @click="notParticipateEvent"
        >
          Não vou mais :(
        </v-btn>
        <v-btn
          v-show="!event.id"
          :disabled="!formValid"
          color="blue darken-1"
          text @click="$emit('add-marker')"
        >
          Criar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import EventInfo from '@/components/events/EventInfo'
import EventRoute from '@/components/events/EventRoute'
import EventPhoto from '@/components/events/EventPhoto'
import EventChat from '@/components/events/EventChat'
import EventParticipant from '@/components/events/EventParticipant'
import api from '@/services/api'
export default {
  name: 'event',
  data () {
    return {
      tabs: null,
      participants: []
    }
  },
  components: {
    EventInfo,
    EventRoute,
    EventPhoto,
    EventChat,
    EventParticipant
  },
  props: {
    event: {
      type: Object,
      default: {
        id: null,
        title: null,
        distance: null,
        type: null,
        pace: null,
        observation: null,
        date: null,
        time: null,
        createdBy: null,
        position: {
          lat: null,
          lng: null
        },
        googleMapsMarker: null
      }
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formValid () {
      if (this.event.title && this.event.distance && this.event.type && this.event.pace && this.event.date && this.event.time) {
        return true
      }
      return false
    },
    myEvent () {
      if (this.$store.getters.user.uid === this.event.createdBy) {
        return true
      }
      return false
    },
    amParticipant () {
      for (const participant of this.participants) {
        if (participant.uid === this.$store.getters.user.uid) {
          return true
        }
        return false
      }
    },
    show: {
      get () {
        return this.dialog
      },
      set (value) {
        this.$emit('update:dialog', value)
      }
    }
  },
  methods: {
    async deleteEvent () {
      try {
        this.show = false
        await api.delete(`/events/${this.event.id}`)
        this.$emit('remove-event-list')
        this.event.googleMapsMarker.setMap(null)
      } catch (error) {
        alert('deu brete')
      }
    },
    async participateEvent () {
      // TO DO: inserir no banco
      this.$refs.eventParticipant.addParticipant()
    },
    async notParticipateEvent () {
      // TO DO: remover do banco
      this.$refs.eventParticipant.removeParticipant()
    }
  }
}
</script>

<style>
  .not-space {
    margin-top: -120px;
  }
</style>
