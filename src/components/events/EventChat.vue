<template>

    <v-list three-line>
      <template v-for="(item) in items">
        <v-list-item
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle v-html="item.message"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

</template>

<script>
export default {
  name: 'event-chat',
  data () {
    return {
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          message: 'Será que vai chover?'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          message: 'Acho que vai, mas vamos mesmo com chuva :)'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          message: 'Não tem tempo ruim, vamos de quaklquer jeito!'
        }
      ]
    }
  },
  computed: {

  },
  props: {
    eventId: null
  }
}
</script>
