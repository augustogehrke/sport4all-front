<template>
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
          <v-chip value="Pedalada" filter outlined>Pedalada</v-chip>
          <v-chip value="Corrida" filter outlined>Corrida</v-chip>
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
        >
          <v-chip value="Leve" filter outlined>Leve</v-chip>
          <v-chip value="Moderado" filter outlined>Moderado</v-chip>
          <v-chip value="Acelerado" filter outlined>Acelerado</v-chip>
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
        >
          <v-chip value="0-6" filter outlined>0-6</v-chip>
          <v-chip value="7-17" filter outlined>7-17</v-chip>
          <v-chip value="18-29" filter outlined>18-29</v-chip>
          <v-chip value="30-54" filter outlined>30-54</v-chip>
          <v-chip value="54+" filter outlined>54+</v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'filters-map',
  props: {
    filters: {
      type: Object,
      default: function () {
        return { pace: null, type: null, distance: null }
      }
    }
  }
}
</script>
