import { 
  headers, 
  firebase,
  DTI_USERNAME,
  DTI_PASSWORD,
  DTI_ACCOUNT_NUMBER,
  reportRef
} from './config'

import { 
  buildCookie, 
  buildReportUrl, 
  convertCsvToJson, 
  extractReportYear,
  calculatePercentageDone
} from './utils'

import {
  loginToDTI, 
  getReports, 
  downloadReport, 
  saveReports
} from './helpers'


const start = () => {
  let authHeaders
  let token
  return reportRef.set(null).then(() => loginToDTI(DTI_USERNAME, DTI_PASSWORD))
  .then(authToken => {
    token = authToken
    authHeaders = Object.assign({}, headers, {'cookie':buildCookie(authToken), 'Auth-Token':authToken})
    return 
  })
  .then(() => getReports(authHeaders))
  .then(reports => reports.map(report => report.id))
  .then(reportIds => {
    return Promise.all(Promise.map(reportIds, reportId => {
      return downloadReport(buildReportUrl(token, reportId))
      .then(res => convertCsvToJson(res.text))
      .then(saveReports)
    }))
  })
  .then(() => console.log('done'))
}

//setInterval(() => start(), 86400000)
start()