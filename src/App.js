import React, {Component} from 'react';
import CurrenciesSwitcher from './components/CurrenciesSwitcher';
class App extends Component {
  componentDidMount() {
    this.props.action("CURRENCIES_FETCH_REQUESTED")
  }

  onExchangeClicked = () => {
    alert("todo")
  }

  render() {
    return (
      <div className="app">
        <div className="exchanging-form-container">
          <CurrenciesSwitcher from/>
          <CurrenciesSwitcher to/>
  
          <div className="submit-button-container">
            <button className="submit-button" onClick={this.onExchangeClicked}>Exchange</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
