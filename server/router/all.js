const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy');
const hc = 'https://bbs.hupu.com/all-nba'

const app = express()

app.get('/', (req, res, next) => {
  superagent.get(hc)
    .end((err, sres) => {
      if(err) {
        console.error(err)
      }

      const $ = cheerio.load(sres.text)
      let api = []

      $(".bbsPaList li").each((idx, ele) => {
        const $ele = $(ele)

        api.push({
          name: $ele.find("a").text().trim(),
          href: $ele.find("a").attr('href'),
        })
      })

      res.send(api)
    })
})

module.exports = app
