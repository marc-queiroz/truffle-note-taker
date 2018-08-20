<template>
  <v-flex xs12 sm8 md4 pa-2>
    <v-card fluid :class="[color, 'elevation-3']">
      <v-card-text pa-1>
        <v-form v-if="editing">
          <v-textarea 
            auto-grow
            v-model="content"
          ></v-textarea>
        </v-form>
        <div v-if="!editing">{{ content }}</div>

      </v-card-text>
      <v-card-actions>
          <v-speed-dial direction="left" fab right absolute open-on-hover transition="slide-x-transition">
            <v-btn slot="activator" color="green lighter-2" dark fab small @click="toggleEdit">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn fab dark small right color="black"><v-icon>bookmark</v-icon></v-btn>
            <v-btn fab dark small right color="black"><v-icon>delete</v-icon></v-btn>
          </v-speed-dial>
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
