import csvtojson from 'csvtojson'

export const buildCookie = token => {
  return `visid_incap_600083=0Q58mJ4+Q0SHXHn9c6F5bUGBQVkAAAAAQUIPAAAAAACKcM7ohc5nqp13E7hRfQk0; incap_ses_484_600083=G9yFXseWLCJgypZI7YO3BpQ+Q1kAAAAAdVi/UnMXQ9ZtoBV775dluQ==; incap_ses_488_600083=MBGbKxiIOk7l4/bBGLrFBu5jRVkAAAAA9nKkaTpIr/iggc1QafFMvA==; token=${token}; account=86029`
}

export const buildReportUrl = (token, reportId) => {
  return `https://api.dtiportal.com/v0/reports/86029/${reportId}?t=${token}`
}

export const extractReportYear = report => {
  return report['Sale Date'].split(' ')[0].split('/')[2]
}

export const convertCsvToJson = (csvString) => {
  return new Promise((resolve, reject) => {
    let final = []
    csvtojson({noheader:false})
    .fromString(csvString)
    .on('json', json => {
      final.push(json)
    })
    .on('done', () => {
      resolve(final)
    })
  })
}

export const calculatePercentageDone = (array, item) => {
  let x = array.indexOf(item)
  let y = x+1
  return y/array.length
}