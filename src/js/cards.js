import contract from 'truffle-contract'
import CardsContract from '@contracts/KeepCards.json'

const Cards = {

  contract: null,

  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(CardsContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance
        resolve()
      }).catch(err => {
        reject(err)
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

  getCardAt: function (index) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.authenticate.call(
        index,
        {from: window.web3.eth.accounts[0]}
      ).then(pseudo => {
        resolve(window.web3.toUtf8(pseudo))
      }).catch(err => {
        reject(err)
      })
    })
  },

  createCard: function (content) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.create(
        content,
        {from: window.web3.eth.accounts[0]}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default Cards
