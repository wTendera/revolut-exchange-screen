import React from 'react';
import CurrencyFormat from 'react-currency-format';

const CurrenciesSwitcherPresenter = ({
  currentExchangeRate,
  currencyFrom,
  currencyTo,
  valueFrom,
  valueTo,
  exceedsBalance,
  balances,
  currentExchangeRateForValueTo,
  submitDisabled,
  onValueFromChange,
  onValueToChange,
  onSubmit,
  swapCurrencies,
  setPreviousToCurrency,
  setNextToCurrency,
  setPreviousFromCurrency,
  setNextFromCurrency
}) => (
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
              <button className="left" onClick={setPreviousFromCurrency}>
                <i className="fa fa-chevron-left" /> 
              </button>
              {currencyFrom} 
              <button className="right" onClick={setNextFromCurrency}>
                <i className="fa fa-chevron-right" />
              </button>
            </h2>
            <CurrencyFormat 
              value={valueFrom} 
              thousandSeparator={true} 
              decimalScale={2}
              allowNegative={false}
              onValueChange={onValueFromChange}/>
              {
                exceedsBalance &&
                  <p className="exceeds-balance">Exceeds balance</p>
              }
            <p>You have <CurrencyFormat value={balances[currencyFrom]} displayType={'text'} thousandSeparator={true} decimalScale={2} />
            &nbsp;{currencyFrom}</p>
        </div>
        
       
        <div className="exchanging-form-box">
          <button className="swap-currencies" onClick={swapCurrencies}>
            <i className="fas fa-arrows-alt-v"/>
          </button>
          <h2>
            <button className="left" onClick={setPreviousToCurrency}>
              <i className="fa fa-chevron-left"/>
            </button>
            {currencyTo} 
            <button className="right" onClick={setNextToCurrency}>
              <i className="fa fa-chevron-right"/>
            </button>
          </h2>
          <CurrencyFormat 
            value={valueTo} 
            thousandSeparator={true} 
            decimalScale={2}
            allowNegative={false}
            onValueChange={onValueToChange}/>
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
          <button className="submit-button" onClick={onSubmit} disabled={submitDisabled}>Exchange</button>
        </div>

      </div>
)

export default CurrenciesSwitcherPresenter;