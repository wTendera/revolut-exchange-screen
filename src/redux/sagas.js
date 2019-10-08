import { call, put, takeEvery } from 'redux-saga/effects'
import ExchangeAPI from '../API/ExchangeAPI.js'

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* fetchCurrencies() {
   try {
      while (true) {
         const currencies = yield call(ExchangeAPI.fetchCurrencies);
         yield put({type: "CURRENCIES_FETCH_SUCCEEDED", currencies});
         yield call(delay, 1000);
      }
   } catch (e) {
      yield put({type: "CURRENCIES_FETCH_FAILED", message: e.message});
   }
}

function* fetchCurrenciesAsync() {
   yield takeEvery("CURRENCIES_FETCH_REQUESTED", fetchCurrencies);
   
}

export {fetchCurrencies}
export default fetchCurrenciesAsync;