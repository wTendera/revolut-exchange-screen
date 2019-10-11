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

  it('getExchangeRateForCurrentCurrencies returns correct value', () => {
    const mockCallback = jest.fn(x => x);

    const wrapper = shallow(
         <CurrenciesSwitcher 
            balances={{"EUR": 10, "USD": 3, "GBP": 2}} 
            currencies={{"USD": 2, "GBP": 0.8}} 
            updateBalances={mockCallback}
          />
      );

    const componentInstance = wrapper.instance();
    componentInstance.onCurrencyChange({currencyFrom: "USD", currencyTo: "GBP"})
    let res = componentInstance.getExchangeRateForCurrentCurrencies();

    expect(res).toBe(0.4)
  })

  it('getValueToExchangeRate returns correct value', () => {
    const mockCallback = jest.fn(x => x);

    const wrapper = shallow(
         <CurrenciesSwitcher 
            balances={{"EUR": 10, "USD": 3, "GBP": 2}} 
            currencies={{"USD": 2, "GBP": 0.8}} 
            updateBalances={mockCallback}
          />
      );

    const componentInstance = wrapper.instance();
    componentInstance.onCurrencyChange({currencyFrom: "USD", currencyTo: "GBP"})
    let res = componentInstance.getValueToExchangeRate();

    expect(res).toBe(2.5)
  })
  
  it('onCurrencyChange sets currency and clears valueTo and valueFrom', () => {
    const mockCallback = jest.fn(x => x);

    const wrapper = shallow(
         <CurrenciesSwitcher 
            balances={{"EUR": 10, "USD": 3, "GBP": 2}} 
            currencies={{"USD": 2, "GBP": 0.8}} 
            updateBalances={mockCallback}
          />
      );

    const componentInstance = wrapper.instance();
    componentInstance.onValueFromChange({value: 11})
    expect(wrapper.state('valueFrom')).toBe(11)
    componentInstance.onCurrencyChange({currencyFrom: "USD", currencyTo: "GBP"})
    expect(wrapper.state('currencyFrom')).toBe('USD')
    expect(wrapper.state('currencyTo')).toBe('GBP')
    expect(wrapper.state('valueFrom')).toBe('')
    expect(wrapper.state('valueTo')).toBe('')
  })

  it('onValueFromChange sets proper values', () => {
    const mockCallback = jest.fn(x => x);

    const wrapper = shallow(
         <CurrenciesSwitcher 
            balances={{"EUR": 10, "USD": 3, "GBP": 2}} 
            currencies={{"USD": 2, "GBP": 0.8}} 
            updateBalances={mockCallback}
          />
      );

      const componentInstance = wrapper.instance();
      componentInstance.onCurrencyChange({currencyFrom: "USD", currencyTo: "GBP"})
      componentInstance.onValueFromChange({value: 11})

      expect(wrapper.state('valueFrom')).toBe(11)
      expect(wrapper.state('valueTo')).toBe(4.4)

  })

  it('onValueToChange sets proper values', () => {
    const mockCallback = jest.fn(x => x);

    const wrapper = shallow(
        <CurrenciesSwitcher 
          balances={{"EUR": 10, "USD": 3, "GBP": 2}} 
          currencies={{"USD": 2, "GBP": 0.8}} 
          updateBalances={mockCallback}
        />
    );

    const componentInstance = wrapper.instance();
    componentInstance.onCurrencyChange({currencyFrom: "USD", currencyTo: "GBP"})
    componentInstance.onValueToChange({value: 2})

    expect(wrapper.state('valueTo')).toBe(2)
    expect(wrapper.state('valueFrom')).toBe(5)
  })

  it('changeCurrencyFrom sets proper currency with direction', () => {
    const mockCallback = jest.fn(x => x);

    const wrapper = shallow(
        <CurrenciesSwitcher 
          balances={{"EUR": 10, "USD": 3, "GBP": 2}} 
          currencies={{"USD": 2, "GBP": 0.8}} 
          updateBalances={mockCallback}
        />
    );

    const componentInstance = wrapper.instance();
    componentInstance.changeCurrencyFrom(1)

    expect(wrapper.state('currencyFrom')).toBe('GBP')
    componentInstance.changeCurrencyFrom(1)
    expect(wrapper.state('currencyFrom')).toBe('USD')
    componentInstance.changeCurrencyFrom(-1)
    expect(wrapper.state('currencyFrom')).toBe('GBP')
  })

  it('changeCurrencyTo sets proper currency with direction', () => {
    const mockCallback = jest.fn(x => x);

    const wrapper = shallow(
        <CurrenciesSwitcher 
          balances={{"EUR": 10, "USD": 3, "GBP": 2}} 
          currencies={{"USD": 2, "GBP": 0.8}} 
          updateBalances={mockCallback}
        />
    );

    const componentInstance = wrapper.instance();
    componentInstance.changeCurrencyTo(1)

    expect(wrapper.state('currencyTo')).toBe('EUR')
    componentInstance.changeCurrencyTo(1)
    expect(wrapper.state('currencyTo')).toBe('GBP')
    componentInstance.changeCurrencyTo(-1)
    expect(wrapper.state('currencyTo')).toBe('EUR')
  })

  describe('onSubmit', () => {

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

    it('does not allow to exchange for the same currency', () => {
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
      componentInstance.onCurrencyChange({currencyFrom: "USD", currencyTo: "USD"})
      let onExchangeClickedRes = componentInstance.onSubmit();

      expect(onExchangeClickedRes).toBe(false);
    });

    it('does not allow to exchange when value is not set', () => {
      const mockCallback = jest.fn(x => x);

      const wrapper = shallow(
           <CurrenciesSwitcher 
              balances={{"EUR": 10}} 
              currencies={{}}
              updateBalances={mockCallback}
            />
        );

      const componentInstance = wrapper.instance();
      componentInstance.onCurrencyChange({currencyFrom: "USD", currencyTo: "USD"})
      componentInstance.onValueFromChange({value: ''})
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