<template>
  <v-flex xs12 sm8 md4 pa-2>
    <v-card fluid :class="[color, 'elevation-3']">
      <v-card-title>
        <v-icon large color='green'>done_all</v-icon>
        <v-speed-dial direction="left" fab right absolute open-on-hover transition="slide-x-transition">
          <v-btn slot="activator" color="green lighter-2" dark fab @click="toggleEdit">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn fab dark right color="black"><v-icon>bookmark</v-icon></v-btn>
          <v-btn fab dark right color="black"><v-icon>delete</v-icon></v-btn>
        </v-speed-dial>
      </v-card-title>
      <v-card-text pa-1>
        <v-form v-if="editing">
          <v-textarea 
            auto-grow
            v-model="content"
          ></v-textarea>
        </v-form>
        <h3 v-if="!editing">{{ content }}</h3>

      </v-card-text>
      <v-card-actions>
          
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>

export default {
  name: 'note-card',
  props: {
    color: String,
    title: String,
    content: String
  },
  data () {
    return {
      editing: false
    }
  },
  methods: {
    toggleEdit () {
      console.log('TOGGLE' + this.editing)
      this.editing = !this.editing
    }
  }
}
</script>
