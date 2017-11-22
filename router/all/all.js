const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy');
const url = require('url')
const hc = 'https://bbs.hupu.com/all-nba'

const app = express()

app.get('/', (req, res, next) => {
  superagent.get(hc)
    .end((err, sres) => {

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
