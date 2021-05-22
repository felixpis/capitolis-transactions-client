import axios from 'axios';

const TRANSACTIONS_URL = '/api/transactions';

const getData = response => response.data;

/**
 * Get transactions
 * @returns {Promise<Transaction[]>}
 */
export function getTransactions() {
    return axios.get(TRANSACTIONS_URL).then(getData);
}

/**
 * Add transaction
 * @param {Transaction} data 
 * @returns {Promise<Transaction>}
 */
export function addTransaction(data) {
    return axios.post(TRANSACTIONS_URL, data).then(getData);
}