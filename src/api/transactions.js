import axios from 'axios';

const TRANSACTIONS_URL = '/api/transactions';

const getData = response => response.data;

export function getTransactions() {
    return axios.get(TRANSACTIONS_URL).then(getData);
}

export function addTransaction(data) {
    return axios.post(TRANSACTIONS_URL, data).then(getData);
}