import React, {Component} from 'react';
import CurrenciesSwitcher from './components/CurrenciesSwitcher';
class App extends Component {
  componentDidMount() {
    this.props.action("CURRENCIES_FETCH_REQUESTED")
  }

  render() {
    return (
      <div className="app">
        <CurrenciesSwitcher/>
      </div>
    );
  }
}

export default App;
