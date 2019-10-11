import React from 'react';
import Enzyme, {mount} from 'enzyme';
import CurrenciesSwitcherPresenter from './CurrenciesSwitcherPresenter';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('CurrenciesSwitcherPresenter component', () => {
  it('displays loading if currencies are not given', () => {
    const wrapper = mount(
         <CurrenciesSwitcherPresenter balances={{}}/>
      );
    expect(wrapper.find('.exchange-rate').first().text()).toBe('Loading')
  });

  it('displays exchange rate if currencies are given', () => {
    const wrapper = mount(
         <CurrenciesSwitcherPresenter balances={{}} currentExchangeRate={1.2} currencyFrom={'USD'} currencyTo={'GBP'}/>
      );
    let node = wrapper.find('.exchange-rate').first().text();  
    expect(node.includes("1 USD")).toBe(true)
    expect(node.includes("1.2")).toBe(true)
  });

  it('displays error text if neccessary', () => {
    const wrapper = mount(
      <CurrenciesSwitcherPresenter balances={{}} exceedsBalance={false}/>
    );
    expect(wrapper.exists('.exceeds-balance')).toBe(false);  
    wrapper.setProps({exceedsBalance: true})
    expect(wrapper.exists('.exceeds-balance')).toBe(true);  
  })
})