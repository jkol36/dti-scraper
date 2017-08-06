require('./config')
import { expect } from 'chai'

import { headers, firebase } from './config'
import { buildCookie, buildReportUrl, convertCsvToJson, extractReportYear } from './utils'
import { loginToDTI, getReports, downloadReport, saveReports, removeReports } from './helpers'
import { DTI_USERNAME, DTI_PASSWORD, DTI_ACCOUNT_NUMBER, reportRef } from './config'


describe('firebase', () => {
  it('should create a new collection', done => {
    firebase.database().ref('test').set('hello', () => {
        firebase.database().ref('test').once('value', s => {
          expect(s.exists()).to.eq(true)
          done()
        })
    })
  })
  it('should remove reports from firebase', done => {
    removeReports()
    .then(() => {
      reportRef.once('value', s => {
        expect(s.exists()).to.eq(false)
        done()
      })
    })
  })
})
describe('dti-scraper', () => {
  let authHeaders
  let token
  let reportId
  let csvData = []
  let reportIds
  let reportArray = []
  it('should login to dti', done => {
    loginToDTI(DTI_USERNAME, DTI_PASSWORD)
    .then(authToken => {
      token = authToken
      expect(authToken).to.not.be.undefined
      authHeaders = Object.assign({}, headers, {'cookie': buildCookie(authToken), 'Auth-Token':authToken})
      done()
    })
  })
  it('should get reports', done => {
    getReports(authHeaders)
    .then(reports => {
      expect(reports).to.not.be.undefined
      console.log(`got ${reports.length} reports`)
      reportIds = reports.map(report => report.id)
      expect(reportIds).to.be.an('array')
      expect(reportIds.length).to.eq(reports.length)
      done()
    })
  })
  it('should download all reports', done => {
    Promise.all(Promise.map(reportIds, reportId => {
      let reportUrl = buildReportUrl(token, reportId)
      return downloadReport(reportUrl)
      .then(res=> {
        csvData.push(res.text)
        return res
      })
    }))
    .then(() => done())
  })
  it('should convert csv to json', done => {
    let csv = csvData[0]
    convertCsvToJson(csv)
    .then(json => {
      expect(json).to.not.be.undefined
      done()
    })
  })
  it('should save reports in firebase', done => {
    expect(reportArray).to.not.be.undefined
    saveReports(reportArray)
    .then(res => {
      expect(res).to.not.be.undefined
      done()
    })
  })
})