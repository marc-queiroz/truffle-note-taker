import contract from 'truffle-contract'
import CardsContract from '@contracts/KeepCards.json'
import pako from 'pako'
// import aes256 from 'aes256'

const Cards = {

  contract: null,

  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(CardsContract)
      self.contract.setProvider(window.web3.currentProvider)

      window.web3.version.getNetwork((err, netId) => {
        if (err) {
          console.log(err)
          return
        }

        switch (netId) {
          case '1':
            console.log('This is mainnet')
            break
          case '3':
            self.contract.at('0x7353cae6fcca50be63e4685d7dbb9b3b44c8ef51').then(instance => {
              self.instance = instance
              console.log(self.instance)
              resolve()
            }).catch(err => {
              reject(err)
            })
            break
          default:
            self.contract.deployed().then(instance => {
              self.instance = instance
              console.log(self.instance)
              resolve()
            }).catch(err => {
              reject(err)
            })
        }
      })
    })
  },

  countCards: function (address) {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.getAmount.call({from: window.web3.eth.accounts[0]})
      .then(count => {
        resolve(count)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getCardAt: async function (index) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.getCardAt.call(
        index,
        {from: window.web3.eth.accounts[0]}
      ).then(content => {
        // content = aes256.decrypt('a', content)
        console.log(content)
        content = Buffer.from(content, 'base64').toString('utf-8')
        console.log(content)
        content = pako.inflate(content, { to: 'string' })
        content = JSON.parse(content)
        resolve(content)
      }).catch(err => {
        reject(err)
      })
    })
  },

  deleteCardAt: async function (index) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.deleteCard(
        index,
        {from: window.web3.eth.accounts[0]}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },

  storeCard: function (content) {
    let self = this

    return new Promise((resolve, reject) => {
      content = JSON.stringify(content)
      content = pako.deflate(content, { to: 'string' })
      // content = aes256.encrypt('a', content)
      content = Buffer.from(content).toString('base64')
      console.log(content)
      self.instance.addCard(
        content,
        {from: window.web3.eth.accounts[0]}
      ).then(tx => {
        console.log(tx)
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default Cards
