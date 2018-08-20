var KeepCards = artifacts.require("./KeepCards.sol");

module.exports = function(deployer) {
  deployer.deploy(KeepCards);
};
