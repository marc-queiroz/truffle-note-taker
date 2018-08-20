<template>
  <v-app id="app">
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 class="text-xs-center">
          <v-icon size="100px" color="light-green lighten-1">style</v-icon>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center>
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
