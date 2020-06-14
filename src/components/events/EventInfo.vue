<template>
  <!-- <v-card-text> -->
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field :disabled="isNewEvent" maxlength="30" :counter="30" :rules="[rules.required]" v-model="event.title" label="Nome" />
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            :disabled="isNewEvent"
            :rules="[rules.required]"
            v-model="event.distance"
            hint="Vamos meter ficha"
            :items="['0-6', '7-17', '18-29', '30-54', '54+']"
            label="Distância (KM)"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-autocomplete
            :rules="[rules.required]"
            :disabled="isNewEvent"
            v-model="event.type"
            :items="['Pedalada', 'Corrida']"
            label="Tipo"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-autocomplete
            :rules="[rules.required]"
            :disabled="isNewEvent"
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
                :disabled="isNewEvent"
                :rules="[rules.required]"
                v-model="event.date"
                label="Data"
                readonly
                v-on="on"
              />
            </template>
            <v-date-picker
              color="#00BC"
              locale="pt-BR"
              v-if="dateModal"
              v-model="event.date"
            >
              <v-spacer />
              <v-btn
                text
                color="#00BC"
                @click="dateModal = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                text
                color="#00BC"
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
                :disabled="isNewEvent"
                :rules="[rules.required]"
                label="Horário"
                readonly
                v-on="on"
              />
            </template>
            <v-time-picker
              format="24hr"
              color="#00BC"
              v-if="timeModal"
              v-model="event.time"
            >
              <v-spacer />
              <v-btn
                text
                color="#00BC"
                @click="timeModal = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                text
                color="#00BC"
                @click="$refs.timeDialog.save(event.time)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12">
          <v-textarea maxlength="200" :counter="200" :disabled="isNewEvent" v-model="event.observation" rows="3" label="Observação" />
        </v-col>
        <event-participant v-if="isNewEvent"/>
      </v-row>
    </v-container>
  <!-- </v-card-text> -->
</template>

<script>
import EventParticipant from './EventParcipant'
export default {
  name: 'event-info',
  components: {
    EventParticipant
  },
  data () {
    return {
      dateModal: null,
      timeModal: null,
      rules: {
        required: value => !!value || 'Preenchimento obrigatório'
      }
    }
  },
  computed: {
    isNewEvent () {
      if (this.event.id) {
        return true
      }
      return false
    }
  },
  props: {
    event: {
      type: Object,
      default: function () {
        return { id: null, title: null, distance: null, type: null, pace: null, observation: null, date: null, time: null }
      }
    }
  }
}
</script>
