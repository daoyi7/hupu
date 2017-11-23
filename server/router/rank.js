const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')

const app = express()
const nba = 'http://www.stat-nba.com/index.php'

app.get('/',(req, res, next) => {
  superagent.get(nba)
    .end((err, sres) => {
      if(err) {
        console.error(err)
      }

      const $ = cheerio.load(sres.text)
      let api = []

      $(".stat_box").eq(1).find("tr").slice(1).each((idx, ele) => {
        const $ele = $(ele)

        api.push({
          area: '东部',
          rank: idx + 1,
          team: $ele.find("td").eq(0).text().trim(),
          win: $ele.find("td").eq(1).text().trim(),
          lose: $ele.find("td").eq(2).text().trim(),
          win_rate: $ele.find("td").eq(3).text().trim(),
          field_difference: $ele.find("td").eq(4).text().trim(),
          coach: $ele.find("td").eq(5).text().trim()
        })
      })

      $(".stat_box").eq(2).find("tr").slice(1).each((idx, ele) => {
        const $ele = $(ele)

        api.push({
          area: '西部',
          rank: idx + 1,
          team: $ele.find("td").eq(0).text().trim(),
          win: $ele.find("td").eq(1).text().trim(),
          lose: $ele.find("td").eq(2).text().trim(),
          win_rate: $ele.find("td").eq(3).text().trim(),
          field_difference: $ele.find("td").eq(4).text().trim(),
          coach: $ele.find("td").eq(5).text().trim()
        })
      })

      res.send(api)
    })
})

module.exports = app
