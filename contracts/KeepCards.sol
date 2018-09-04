pragma solidity ^0.4.15;

contract KeepCards {

    mapping (address=>string[]) cards;
    mapping (address=>uint256) amounts;

    // event UserCreated(address indexed _address, bytes32 _pseudo);
    // event UserDestroyed(address indexed _address);

    function addCard (string content) public {
        amounts[msg.sender]++;
        cards[msg.sender].push(content);
    }

    function getCardAt (uint256 index) public view returns (string contents) {
        return (cards[msg.sender][index]);
    }

    function getAmount () public view returns (uint256 contents) {
        return (amounts[msg.sender]);
    }

    function deleteCard(uint256 index) public {
        require(index < amounts[msg.sender]);
        cards[msg.sender][index] = cards[msg.sender][amounts[msg.sender]-1];
        cards[msg.sender].length--;
        amounts[msg.sender]--;
    }  

}
    // function authenticate () public constant returns (bytes32 _pseudo) {
    //     require(exists(msg.sender));
    //     return (users[msg.sender]);
    // }

    // function create (bytes32 _pseudo) public {
    //     users[msg.sender] = _pseudo;
    //     emit UserCreated(msg.sender, _pseudo);
    // }

    // function destroy () public {
    //     require(exists(msg.sender));
    //     delete users[msg.sender];
    //     emit UserDestroyed(msg.sender);
    // }

    // function get (address _address) public constant returns(bytes32 _pseudo) {
    //     require(exists(_address));
    //     return (users[_address]);
    // }

// ROPSTEN ==> 0x7353cae6fcca50be63e4685d7dbb9b3b44c8ef51