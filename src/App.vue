<template>
  <v-app id="app">
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 class="text-xs-center" pb-4>
          <v-icon size="100px" color="green lighter-2">style</v-icon>
          <h3 class="primary--text"> Click <v-icon>bookmark</v-icon> to store your cards on blockchain. Click <v-icon>delete</v-icon> to delete them.</h3>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center pa-6 ma-6>
        <v-flex xs12 pa-6 ma-6>
          <v-layout row wrap >
            <note-card v-for="(item, index) in listCards" 
            :key="item"
            :index="index"
            :tx="item.tx"
            :stored="item.stored"
            :content="item.content"
            :removeFunction="removeCard"
            :updateFunction="updateCard"
            :storeFunction="storeCard">
            </note-card>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-btn dark fab bottom left>
        <v-icon @click="addCard">add</v-icon>
      </v-btn>
      <v-btn dark fab bottom left>
        <v-icon @click="refreshCards">refresh</v-icon>
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
        pseudo: undefined,
        listCards: [
          {tx: '', stored: false, content: {color: 'green lighten-5', title: 'blablabla', content: 'Example card...'}}
        ]
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
      Cards.init()
      .catch(err => {
        console.log(err)
      })

      let options = {
        address: window.web3.eth.accounts[0],
        fromBlock: 'pending',
        toBlock: 'pending'
      }

      window.web3.eth.filter(options, function (error, result) {
        if (!error) console.log(result)
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
      },
      refreshCards: function (e) {
        Cards.countCards()
        .then(count => {
          this.listCards = []
          for (let i = 0; i < count; i++) {
            Cards.getCardAt(i).then(res => {
              this.listCards.push({tx: '0x0', stored: true, content: res})
            })
          }
        })
      },
      addCard: function (e) {
        this.listCards.push({
          tx: '',
          stored: false,
          content: {
            color: 'green lighten-5',
            title: 'blablabla',
            content: 'Example card...'
          }
        })
      },
      storeCard: function (index, content) {
        this.listCards[index].tx = 'pending' // show temporarly Sending message
        Cards.storeCard(content).then(res => {
          this.listCards[index].tx = res.tx
          if (res.receipt.blockNumber) this.listCards[index].stored = true
        }).catch(err => {
          this.listCards[index].tx = ''
          console.log(err)
        })
      },
      updateCard: function (index, color, title, content) {
        this.listCards[index].content = {
          color: color,
          title: title,
          content: content
        }
      },
      removeCard: function (index) {
        if (!this.listCards[index].stored) {
          this.listCards.splice(index, 1)
          return
        }
        Cards.deleteCardAt(index).then(res => {
          this.listCards.splice(index, 1)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
