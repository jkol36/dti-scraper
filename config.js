global.Promise = require('bluebird')
import firebaseAdmin from 'firebase-admin'

export const DTI_USERNAME = 'jonathankolman@gmail.com'
export const DTI_PASSWORD = 'J0nnyb0y123'
export const DTI_ACCOUNT_NUMBER = '86029'

const serviceAccount = require('./serviceAccount.json')

export const headers = {
    'Origin': 'https://www.dtiportal.com',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.8,sv;q=0.6',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://www.dtiportal.com/login/',
    'Connection': 'keep-alive'    
};

export const firebase = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://ticketlynx-5a17f.firebaseio.com"

})

export const reportRef = firebase.database().ref('reports')