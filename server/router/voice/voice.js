const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy');
const url = require('url')
const hc = 'https://voice.hupu.com/nba'

const app = express()

app.get('/', (req, res, next) => {
  superagent.get(hc)
    .end((err, sres) => {
      if(err) {
        console.error(err)
      }

      const $ = cheerio.load(sres.text)
      let api = []

      $(".news-list li").each((idx, ele) => {
        const $ele = $(ele)

        api.push({
          id: $ele.find("h4 a").attr("href").split("").slice(27,34)
          title: $ele.find("h4 a").text().trim(),
          href: $ele.find("h4 a").attr("href"),
          upTime: $ele.find(".other-left a").eq(0).text().trim(),
          via: $ele.find(".comeFrom a").text().trim(),
        })
      })

      res.send(api)
    })
})

module.exports = app
