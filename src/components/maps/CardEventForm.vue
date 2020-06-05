<template>
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
</template>

<script>
export default {
  name: 'card-event-form',
  data () {
    return {
      dateModal: null,
      timeModal: null
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
