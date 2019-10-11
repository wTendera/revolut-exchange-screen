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
      const mockCallback = jest.fn(x => x);

      const wrapper = shallow(
           <CurrenciesSwitcher 
              balances={{"EUR": 10}} 
              currencies={{}}
              updateBalances={mockCallback}
            />
        );

      const componentInstance = wrapper.instance();
      componentInstance.onValueFromChange({value: 11})
      let onExchangeClickedRes = componentInstance.onSubmit();

      expect(onExchangeClickedRes).toBe(false);
    });

    it('exchanges money bases on current exchange rate for currency', () => {
      const mockCallback = jest.fn(x => x);

      const wrapper = shallow(
        <CurrenciesSwitcher 
          balances={{"EUR": 10, "USD": 0}} 
          currencies={{"USD": 1.5}} 
          updateBalances={mockCallback}/>
      );

      const componentInstance = wrapper.instance();
      componentInstance.onValueFromChange({value: 1})
      let onExchangeClickedRes = componentInstance.onSubmit();
      expect(mockCallback.mock.calls[0][0]).toStrictEqual({
        "EUR": 9,
        "USD": 1.5
      });  

      expect(onExchangeClickedRes).toBe(true);
    })

    it('exchanges money bases on current exchange rate for currency different than USD', () => {
      const mockCallback = jest.fn(x => x);

      const wrapper = shallow(
        <CurrenciesSwitcher 
          balances={{"EUR": 10, "USD": 3, "GBP": 2}} 
          currencies={{"USD": 2, "GBP": 0.8}} 
          updateBalances={mockCallback}/>
      );

      const componentInstance = wrapper.instance();
      componentInstance.onCurrencyChange({currencyFrom: "USD", currencyTo: "GBP"})
      componentInstance.onValueFromChange({value: 1})

      let onExchangeClickedRes = componentInstance.onSubmit();
      expect(mockCallback.mock.calls[0][0]).toStrictEqual({
        "EUR": 10,
        "USD": 2,
        "GBP": 2.4
      });  

      expect(onExchangeClickedRes).toBe(true);
    })
  })

});