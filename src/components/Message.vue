<template>
	 <v-container fluid>
    <v-snackbar
        v-model="show"
        :bottom="y === 'bottom'"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :top="y === 'top'"
        :right="x === 'right'"
        :vertical="mode === 'vertical'"
    >
      {{ text }}
    <v-btn
      dark
      text
      @click="show = false"
    >
      x
  </v-btn>
    </v-snackbar>
	 </v-container>
</template>

<script>
export default {
  name: 'message',
  data () {
    return {
      color: 'success',
      mode: 'multi-line',
      show: false,
      text: 'Operação realizada :)',
      timeout: 2500,
      y: 'top',
      x: 'right'
    }
  }
}
</script>
