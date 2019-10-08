import { call, put } from 'redux-saga/effects';
import {fetchCurrencies, delay} from './sagas';
import ExchangeAPI from '../API/ExchangeAPI';

it('fetchCurrencies Saga test', () => {
  const gen = fetchCurrencies()

  expect(gen.next().value).toEqual(call(ExchangeAPI.fetchCurrencies))
  expect(gen.next().value).toEqual(put({type: "CURRENCIES_FETCH_SUCCEEDED"}))
  expect(gen.next().value).toEqual(call(delay, 1000))
  expect(gen.next().value).toEqual(call(ExchangeAPI.fetchCurrencies))
  expect(gen.next().value).toEqual(put({type: "CURRENCIES_FETCH_SUCCEEDED"}))
  expect(gen.next().value).toEqual(call(delay, 1000))
});