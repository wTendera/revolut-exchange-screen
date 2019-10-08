import React, { Component } from 'react';
import { connect } from 'react-redux';

class CurrenciesSwitcher extends Component {

  render () {
    const { currencies } = this.props;
    return (
      <div className="exchanging-form-box">
          <h2>EUR</h2>
          <p>You have 25.00 EUR</p>
          <pre>{JSON.stringify(currencies)}</pre>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.currencies
  }
}
export default connect(mapStateToProps, null)(CurrenciesSwitcher);