import agent from 'superagent-bluebird-promise'
import { headers, DTI_ACCOUNT_NUMBER, reportRef } from './config'
import { extractReportYear } from './utils'



export const loginToDTI = (email, password) => {
  return agent
          .post('https://api.dtiportal.com/v0/auth')
          .set(headers)
          .send({email, password})
          .then(res => res.body.token)
          .catch(err => err)

}

export const getReports = (authHeaders) => {
  return agent
          .get(`https://api.dtiportal.com/v0/reports/${DTI_ACCOUNT_NUMBER}`)
          .set(authHeaders)
          .then(res => res.body.reports)
          .catch(err => err)

}

export const downloadReport = (reportUrl) => {
  return agent
          .get(reportUrl)
          .then(res => res)
          .catch(err => err)
}

export const saveReports = reports => {
 return Promise.all(Promise.map(reports, report => {
  let reportYear = extractReportYear(report)
  return reportRef.child(reportYear).push(report)
 }))
}

export const removeReports = () => {
  return reportRef.remove() 
}