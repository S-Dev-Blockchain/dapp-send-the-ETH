import React from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

class App extends React.Component {

  state = {
    address: '',
    lottery: '',
    events: '',
  }
  
  async componentDidMount() {

    await window.ethereum.enable()
    this.w3 = new Web3(window.ethereum)

    // getAccounts
    const address = (await this.w3.eth.getAccounts())[0]
    this.setState({ address })

    this.contract = new this.w3.eth.Contract([
      {
        "constant": false,
        "inputs": [],
        "name": "implement",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "_lottery",
            "type": "uint256"
          }
        ],
        "name": "showLottery",
        "type": "event"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "num",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ], "0xF666108e057d5CA30a962eEf43Ef25ff52b70364")

    // showNumberLottery
    const lottery = await this.contract.methods.num().call()
    this.setState({lottery})
  
    // connectEvents
    var events = this.contract.getPastEvents(
      'showLottery',
      {
        fromBlock: 0,
        toBlock: 'latest'
      },
      (err, events) => { console.log(events)});

      //@@@@ testShowNumber From event showLottery()
      // events.watch(function(error, result){
      //   if(!error) {
      //     console.log(result.returnValues);
      //   }
      // });

      //@@@@ testShowNumber From event showLottery()
      // this.contract.showLottery().watch(function(error, result) {
      //   if(!error) {
      //     $("#eve").html(result.args.num.toString());
      //   }
      //   else {
      //     console.log(error);
      //   }
      // });





      // this.setState({address})
    
    

  }

  // sendTransaction RandLotteryNumber > methods.implement
  async randLottery() {
    await this.contract.methods.implement().send({from : (await this.w3.eth.getAccounts())[0]});
  }

  render() {
    return (
      <div className="App">
        <p>Address KUU: {this.state.address}</p>
        <button onClick={this.randLottery.bind(this)}>Rand</button>
        <p>Lottery Number: {this.state.lottery}</p>
        <p>History Number: {this.state.events}</p>
        <div id="eve"></div>
      </div>
    );
  }
}

export default App;