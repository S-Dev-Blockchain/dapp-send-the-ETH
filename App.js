import React from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

const ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "sendEther",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "invest",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
]

class App extends React.Component {

  state = {
    address: '',
  }

  async componentDidMount() {
    await window.ethereum.enable()
    this.w3 = new Web3(window.ethereum)
    const address = (await this.w3.eth.getAccounts())[0]
    this.setState({ address })
    this.contract =new this.w3.eth.Contract(ABI,"0x5888E695e574B6fd87E9552a50736875ec535773")
  }

  						// address to smart contract
  async sendToContract() {
    await this.contract.methods.invest().send({
      from: this.state.address,
      value: this.state.amount,
    })
  }

  onChange1(e) {
	  this.setState({
		amount: e.target.value,
	  })
  }					
  						// smart contract to address
  async contractSendToAddress() {
	  await this.contract.methods.sendEther(this.state.addreceiv).send({
		  from: this.contract,
	  })
  }

  onChange2(e) {
	  this.setState({
		to: e.target.value,
	  })
  }

  render() {
    return (
      <div className="App">
        
		<div>
          <input placeholder="amount" onChange={this.onChange1.bind(this)}/>
          <button onClick={this.sendToContract.bind(this)}>sendToContract</button>  
        </div>

		<div>
          <input placeholder="to address" onChange={this.onChange2.bind(this)}/>
          <button onClick={this.contractSendToAddress.bind(this)}>contractSend</button>  
        </div>
      </div>
	  
   );
  }
}

export default App;
