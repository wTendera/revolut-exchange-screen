import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBalances } from '../redux/sagas'
const currencies = [
  'USD', 'EUR', 'GBP'
]

class CurrenciesSwitcher extends Component {
  state = {
    currencyFrom: currencies[1],
    currencyTo: currencies[0],
    valueFrom: '',
    valueTo: '',
  }

  onExchangeClicked = () => {
    const { currencyFrom, currencyTo, valueFrom } = this.state;
    const { balances, updateBalances, currencies } = this.props;

    if(valueFrom > balances[currencyFrom]) {
      return false;
    }

    let newBalances = {
      ...balances,
    }

    newBalances[currencyFrom] = balances[currencyFrom] - valueFrom;
    newBalances[currencyTo] = balances[currencyTo] + valueFrom * currencies[currencyTo]

    updateBalances(newBalances)
    return true;
  }

  onValueFromChange = (e) => {
    this.setState({
      valueFrom: e.target.value,
    });
  } 

  onValueToChange = (e) => {
    this.setState({
      valueTo: e.target.value,
    });
  } 

  render () {
    const { balances } = this.props;
    const { currencyFrom, currencyTo, valueFrom, valueTo } = this.state;
    return (
      <div className="exchanging-form-container">
        <div className="exchanging-form-box">
            <h2>{currencyFrom}</h2>
            <input type="number" value={valueFrom} onChange={this.onValueFromChange}/>
            <p>You have {balances[currencyFrom]} {currencyFrom}</p>
        </div>

        <div className="exchanging-form-box">
            <h2>{currencyTo}</h2>
            <input type="number" value={valueTo} onChange={this.onValueToChange}/>
            <p>You have {balances[currencyTo]} {currencyTo}</p>
        </div>

        <div className="submit-button-container">
          <button className="submit-button" onClick={this.onExchangeClicked}>Exchange</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.currencies,
    balances: state.balances
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateBalances: (balances) => dispatch(updateBalances(balances))
  }
}
export { CurrenciesSwitcher }

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesSwitcher);