<template>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
           <v-alert
            dense
            type="info"
          >
            <strong>{{ title }}</strong>
          </v-alert>
          <v-alert
            border="top"
            colored-border
            type="info"
            elevation="2"
          >
            {{ message }}
          </v-alert>
        </v-col>
        <v-col  cols="12" sm="6">
          <v-img
            src="../../../static/img/wip.jpg"
            max-width="300"
            max-height="300"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'wip',
  props: {
    title: {
      type: String,
      default: 'Estamos desenvolvendo ;)'
    },
    message: {
      type: String,
      default: 'Estamos trabalhando para lançar mais uma novidade :)'
    }
  }
}
</script>
