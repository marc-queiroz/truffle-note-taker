var pako = require('pako');

var KeepCards = artifacts.require("KeepCards");
var account_one = "0x627306090abab3a6e1400e9345bc60c78a8bef57"; // an address
var account_two = "0xf17f52151ebef6c7334fad080c5704d77216b732"; // another address

let inputMessage = 'Message to be stored... crossing fingers.';
let compressedMessage = pako.deflateRaw(JSON.stringify(inputMessage), { to: 'string' });

it("Will create a card.", async () => {
    let keep = await KeepCards.deployed();
    console.log("Keep is placed at address: " + keep.address);
    await keep.addCard(compressedMessage);
    await keep.addCard(compressedMessage);
    await keep.addCard(compressedMessage);
    assert.equal(1, 1, "Market id created isn't correct!");
});

it("Will show card content.", async () => {
    let keep = await KeepCards.deployed();
    let card = await keep.getCardAt(0);
    console.log('Card 0 content => '+card);
    let restoredMessage = JSON.parse(pako.inflateRaw(card, { to: 'string' }));
    console.log('Card 0 uncompressed content => '+restoredMessage);
    assert.equal(restoredMessage, inputMessage, "Message returned is different from input.");
    let amount = await keep.getAmount();
    console.log('Cards count => '+ amount);
    assert.equal(amount, 3, "Cards count is wrong.");
});
