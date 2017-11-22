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
      let urls = []

      $(".news-list li").slice(0, 20).each((idx, ele) => {
        const $ele = $(ele)

        if(typeof($ele.attr("class"))=="undefined") {
          const href = $ele.find("h4 a").attr("href")

          urls.push(href)
        }
      })

      let ep = new eventproxy()

      urls.forEach((voice_url) => {
        superagent.get(voice_url)
          .end((err, sres) => {
            ep.emit('voice_html', [voice_url, sres.text])
          })
      })

      ep.after('voice_html', urls.length, (url) => {
        url = url.map((url_item) => {
          let href = url_item[0]
          let html = url_item[1]
          let $ = cheerio.load(html)

          return ({
          href: href,
            id: href.split("").slice(27,34).join(""),
            title: $('.headline').text().trim(),
            upTime: $(".artical-info a.time span").eq(0).text().trim(),
            source: $(".comeFrom a").eq(0).text().trim(),
            thumb: $('.artical-importantPic img').eq(0).attr("src"),
            info: $('.artical-main-content p').eq(0).text().trim()
          })
        })

        res.send(url)
      })
    })
})

module.exports = app
