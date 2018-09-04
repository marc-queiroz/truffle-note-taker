<template>
  <v-flex xs12 sm6 md4 pa-2>
    <v-card fluid :class="[colorLocal, 'elevation-3']">
      <v-card-title>
        <v-tooltip bottom>
          <v-icon large color='green'slot="activator" v-if="stored">done_all</v-icon>
          <v-icon large color='green' slot="activator" v-else-if="tx">done</v-icon>
          <v-icon large color='orange' slot="activator" v-else>warning</v-icon>
          <div v-if="tx"> TX:{{tx}}</div>
        </v-tooltip>
        <div v-if="stored" class="green--text"> STORED</div>
        <div v-else-if="tx" class="green--text"> PENDING</div>
        <div v-else class="orange--text"> NOT STORED</div>
        <v-speed-dial direction="left" fab right absolute open-on-hover transition="slide-x-transition">
          <v-btn slot="activator" color="green lighter-2" flat fab @click="toggleEdit">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn fab dark right color="black" @click="store"><v-icon>bookmark</v-icon></v-btn>
          <v-btn fab dark right color="black" @click="remove"><v-icon>delete</v-icon></v-btn>
        </v-speed-dial>
      </v-card-title>
      <v-card-text>
        <v-form v-if="editing">
          <v-textarea 
            auto-grow
            v-model="contentLocal"
          ></v-textarea>
        </v-form>
        <div class="subheading" v-if="!editing" @click="toggleEdit">{{ contentLocal }}</div>

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
    index: 0,
    tx: '',
    stored: Boolean,
    content: {},
    updateFunction: {},
    removeFunction: {},
    storeFunction: {}
  },
  data () {
    return {
      colorLocal: String,
      titleLocal: String,
      contentLocal: String,
      editing: false
    }
  },
  mounted () {
    this.colorLocal = this.content.color
    this.titleLocal = this.content.title
    this.contentLocal = this.content.content
  },
  methods: {
    toggleEdit () {
      console.log('TOGGLE' + this.editing)
      this.editing = !this.editing
      this.update(this.index, this.colorLocal, this.titleLocal, this.contentLocal)
    },
    remove () {
      this.removeFunction(this.index)
    },
    update () {
      this.updateFunction(this.index, this.colorLocal, this.titleLocal, this.contentLocal)
    },
    store () {
      this.storeFunction(this.index, this.content)
    }
  }
}
</script>
