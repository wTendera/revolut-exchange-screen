import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import { CurrenciesSwitcher } from './CurrenciesSwitcher';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('CurrenciesSwitcher component', () => {
  it('has proper initial state', () => {
    const wrapper = shallow(
         <CurrenciesSwitcher balances={{}}/>
      );
    expect(wrapper.state('currencyFrom')).toBe("EUR");
    expect(wrapper.state('currencyTo')).toBe("USD");
  });
  
  describe('onExchangeClicked', () => {

    it('does not allow to use more money than user balance for currency', () => {
      const wrapper = shallow(
           <CurrenciesSwitcher balances={{"EUR": 10}} currencies={{}}/>
        );

      const componentInstance = wrapper.instance();
      componentInstance.onValueFromChange({target: {value: 11}})
      let onExchangeClickedRes = componentInstance.onExchangeClicked();

      expect(onExchangeClickedRes).toBe(false);
    });

    it('exchanges money bases od current exchange rate for currency', () => {
      const mockCallback = jest.fn(x => x);

      const wrapper = shallow(
        <CurrenciesSwitcher 
          balances={{"EUR": 10, "USD": 0}} 
          currencies={{"USD": 1.5}} 
          updateBalances={mockCallback}/>
      );

      const componentInstance = wrapper.instance();
      componentInstance.onValueFromChange({target: {value: 1}})
      let onExchangeClickedRes = componentInstance.onExchangeClicked();
      expect(mockCallback.mock.calls[0][0]).toStrictEqual({
        "EUR": 9,
        "USD": 1.5
      });  

      expect(onExchangeClickedRes).toBe(true);
    })

    it('exchanges money bases od current exchange rate for currency different than USD', () => {
      const mockCallback = jest.fn(x => x);

      const wrapper = shallow(
        <CurrenciesSwitcher 
          balances={{"EUR": 10, "USD": 3, "GBP": 2}} 
          currencies={{"USD": 2, "GBP": 0.8}} 
          updateBalances={mockCallback}/>
      );

      const componentInstance = wrapper.instance();
      componentInstance.onCurrencyFromChange("USD")
      componentInstance.onCurrencyToChange("GBP")
      componentInstance.onValueFromChange({target: {value: 1}})

      let onExchangeClickedRes = componentInstance.onExchangeClicked();
      expect(mockCallback.mock.calls[0][0]).toStrictEqual({
        "EUR": 10,
        "USD": 2,
        "GBP": 2.4
      });  

      expect(onExchangeClickedRes).toBe(true);
    })
  })

});