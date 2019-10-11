import React, {Component} from 'react';
import CurrenciesSwitcher from './components/CurrenciesSwitcher';
import { ToastContainer } from 'react-toastify';
class App extends Component {
  componentDidMount() {
    this.props.action("CURRENCIES_FETCH_REQUESTED")
  }

  render() {
    return (
      <div className="app">
        <CurrenciesSwitcher/>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
