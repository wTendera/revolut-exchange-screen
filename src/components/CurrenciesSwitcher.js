import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateBalances } from '../redux/sagas'
import { toast } from 'react-toastify';
import CurrenciesSwitcherPresenter from './CurrenciesSwitcherPresenter';
import currencies from './currencies.js'

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

  onSubmit = () => {
    const { currencyFrom, currencyTo, valueFrom } = this.state;
    const { balances, updateBalances, currencies } = this.props;

    if(valueFrom > balances[currencyFrom] || currencyFrom === currencyTo || valueFrom === '') {
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

    toast.success(`You have succesfully exchanged ${valueFrom} ${currencyFrom} to ${currencyTo}`)
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

  onCurrencyChange = ({currencyFrom = this.state.currencyFrom, currencyTo = this.state.currencyTo}) => {
    this.setState({
      currencyFrom,
      currencyTo,
      valueTo: '',
      valueFrom: ''
    })
  }

  changeCurrencyFrom = (direction = 1) => {
    const { currencyFrom } = this.state;
    const newIndex = (currencies.indexOf(currencyFrom) + direction + currencies.length) % currencies.length;
    this.onCurrencyChange({currencyFrom: currencies[newIndex]});
  }

  changeCurrencyTo = (direction = 1) => {
    const { currencyTo } = this.state;
    const newIndex = (currencies.indexOf(currencyTo) + direction + currencies.length) % currencies.length;
    this.onCurrencyChange({currencyTo: currencies[newIndex]});
  }

  render () {
    const { balances } = this.props;
    const { currencyFrom, currencyTo, valueFrom, valueTo } = this.state;
    const currentExchangeRate = this.getExchangeRateForCurrentCurrencies();
    const currentExchangeRateForValueTo = this.getValueToExchangeRate();
    const exceedsBalance = valueFrom > balances[currencyFrom];
    const submitDisabled = currencyFrom === currencyTo || exceedsBalance;

    return (
      <CurrenciesSwitcherPresenter
        currentExchangeRate={currentExchangeRate}
        currencyFrom={currencyFrom}
        currencyTo={currencyTo}
        valueFrom={valueFrom}
        valueTo={valueTo}
        exceedsBalance={exceedsBalance}
        balances={balances}
        currentExchangeRateForValueTo={currentExchangeRateForValueTo}
        submitDisabled={submitDisabled}
        onValueFromChange={this.onValueFromChange}
        onValueToChange={this.onValueToChange}
        onSubmit={this.onSubmit}
        swapCurrencies={() => this.onCurrencyChange({currencyTo: currencyFrom, currencyFrom: currencyTo})}
        setPreviousToCurrency={() => this.changeCurrencyTo(-1)}
        setNextToCurrency={() => this.changeCurrencyTo(1)}
        setPreviousFromCurrency={() => this.changeCurrencyFrom(-1)}
        setNextFromCurrency={() => this.changeCurrencyFrom(1)}
      />
    )
  }
}

CurrenciesSwitcher.propTypes = {
  balances: PropTypes.shape({}),
  updateBalances: PropTypes.func,
  currencies: PropTypes.shape({})
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