import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBalances } from '../redux/sagas'
import CurrencyFormat from 'react-currency-format';
 
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


  getExchangeRateForCurrentCurrencies = () => {
    const { currencyFrom, currencyTo } = this.state;
    const { currencies = {}} = this.props;
    return 1/(currencies[currencyFrom] || 1) * currencies[currencyTo]
  }

  getValueToExchangeRate = () => {
    const { currencyFrom, currencyTo } = this.state;
    const { currencies = {}} = this.props;
    return 1/(currencies[currencyTo] || 1) * currencies[currencyFrom]
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
    newBalances[currencyTo] = balances[currencyTo] + valueFrom/(currencies[currencyFrom] || 1) * currencies[currencyTo]

    this.setState({
      valueFrom: '',
      valueTo: '',
    })
    updateBalances(newBalances)
    return true;
  }

  onValueFromChange = (values) => {
    const { value } = values;
    const { currencyFrom, currencyTo } = this.state;
    const { currencies } = this.props;

    this.setState({
      valueFrom: value,
      valueTo: value/(currencies[currencyFrom] || 1) * currencies[currencyTo]
    });
  } 

  onValueToChange = (values) => {
    const { value } = values;
    const { currencyFrom, currencyTo } = this.state;
    const { currencies } = this.props;
    
    this.setState({
      valueFrom: value/(currencies[currencyTo] || 1) * currencies[currencyFrom],
      valueTo: value,
    });
  } 

  onCurrencyFromChange = (currencyFrom) => {
    this.setState({
      currencyFrom,
      valueTo: '',
      valueFrom: ''
    })
  }

  onCurrencyToChange = (currencyTo) => {
    this.setState({
      currencyTo,
      valueTo: '',
      valueFrom: ''
    })
  }

  setPreviousFromCurrency = () => {
    const { currencyFrom } = this.state;
    const newIndex = (currencies.indexOf(currencyFrom) - 1 + currencies.length) % currencies.length;
    this.onCurrencyFromChange(currencies[newIndex]);
  }

  setNextFromCurrency = () => {
    const { currencyFrom } = this.state;
    const newIndex = (currencies.indexOf(currencyFrom) + 1) % currencies.length;
    this.onCurrencyFromChange(currencies[newIndex]);
  }

  setPreviousToCurrency = () => {
    const { currencyTo } = this.state;
    const newIndex = (currencies.indexOf(currencyTo) - 1 + currencies.length) % currencies.length;
    this.onCurrencyToChange(currencies[newIndex]);
  }

  setNextToCurrency = () => {
    const { currencyTo } = this.state;
    const newIndex = (currencies.indexOf(currencyTo) + 1) % currencies.length;
    this.onCurrencyToChange(currencies[newIndex]);
  }


  render () {
    const { balances } = this.props;
    const { currencyFrom, currencyTo, valueFrom, valueTo } = this.state;
    const currentExchangeRate = this.getExchangeRateForCurrentCurrencies();
    const currentExchangeRateForValueTo = this.getValueToExchangeRate();
    
    return (
      <div className="exchanging-form-container">
        <div className="exchanging-form-box">
            <p className="exchange-rate">
              {
                currentExchangeRate ? 
                  <>
                    1 {currencyFrom} =&nbsp;
                    <CurrencyFormat value={currentExchangeRate} displayType={'text'} thousandSeparator={true} decimalScale={2} />
                    &nbsp;
                    {currencyTo}
                  </>
                  :
                  "Loading"
              }
              
            </p>
            <h2>
              <button className="left" onClick={this.setPreviousFromCurrency}>
                <i className="fa fa-chevron-left" /> 
              </button>
              {currencyFrom} 
              <button className="right" onClick={this.setNextFromCurrency}>
                <i className="fa fa-chevron-right" />
              </button>
            </h2>
            <CurrencyFormat 
              value={valueFrom} 
              thousandSeparator={true} 
              decimalScale={2}
              allowNegative={false}
              onValueChange={this.onValueFromChange}/>
            <p>You have <CurrencyFormat value={balances[currencyFrom]} displayType={'text'} thousandSeparator={true} decimalScale={2} />
            &nbsp;{currencyFrom}</p>
        </div>

        <div className="exchanging-form-box">
            <h2>
              <button className="left" onClick={this.setPreviousToCurrency}>
                <i className="fa fa-chevron-left"/>
              </button>
              {currencyTo} 
              <button className="right" onClick={this.setNextToCurrency}>
                <i className="fa fa-chevron-right"/>
              </button>
            </h2>
            <CurrencyFormat 
              value={valueTo} 
              thousandSeparator={true} 
              decimalScale={2}
              allowNegative={false}
              onValueChange={this.onValueToChange}/>
            <p>You have <CurrencyFormat value={balances[currencyTo]} displayType={'text'} thousandSeparator={true} decimalScale={2} />
            &nbsp;{currencyTo}</p>
            <p className="exchange-rate value-to">
              {
                currentExchangeRateForValueTo ? 
                  <>1 {currencyTo} =&nbsp;
                  <CurrencyFormat value={currentExchangeRateForValueTo} displayType={'text'} thousandSeparator={true} decimalScale={2} />
                  &nbsp;
                  {currencyFrom}
                  </>
                  :
                  "Loading"
              }
              
            </p>
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