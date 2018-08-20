<template>
  <v-app id="app">
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 class="text-xs-center" pb-4>
          <v-icon size="100px" color="green lighter-2">style</v-icon>
          <h3 class="primary--text"> Click <v-icon>bookmark</v-icon> to store your cards on blockchain. Click <v-icon>delete</v-icon> to delete them.</h3>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center pa-6>
        <v-layout row wrap>
          <note-card color="green lighten-5" title="Test" content="ahauahuahauahuaua uahauahu ahua huau"></note-card>
          <note-card color="green lighten-5" title="Test" content="ahauahuahauahuaua uahauahu ahua huau"></note-card>
          <!-- <v-card class="elevation-3">
            <v-toolbar color="primary">
              <v-toolbar-title>Dashboard</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <div v-if="userExists">Welcome {{ pseudo }}.</div>
                <div v-else>{{ msg }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-if="userExists" color="alert" @click="destroyAccount">Destroy Account</v-btn>
              <v-btn v-else color="primary" to="/signup">Sign up</v-btn>
            </v-card-actions>
          </v-card> -->
        </v-layout>
      </v-layout>
      <v-btn dark fab fixed bottom left>
        <v-icon>add</v-icon>
      </v-btn>
    </v-container>
  </v-app>
</template>

<script>
  import Cards from '@/js/cards'
  import Card from '@/components/Card'

  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to your truffle-Vuetify DAPP',
        pseudo: undefined
      }
    },
    components: {
      'note-card': Card
    },
    computed: {
      userExists: function () {
        console.log(this.pseudo)
        return (typeof this.pseudo !== 'undefined')
      }
    },
    beforeCreate: function () {
      Cards.init().then(() => {
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      destroyAccount: async function (e) {
        e.preventDefault()
        Cards.destroy().then(() => {
          this.pseudo = undefined
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
