<template>
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
</template>

<script>
  import Cards from '@/js/cards'
  import Card from './Card'

  export default {
    name: 'dashboard',
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
        // Users.exists(window.web3.eth.accounts[0]).then((exists) => {
        //   if (exists) {
        //     Users.authenticate().then(pseudo => {
        //       this.pseudo = pseudo
        //     })
        //   }
        // })
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