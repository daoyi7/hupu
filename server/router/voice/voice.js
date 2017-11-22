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

      $(".news-list li").each((idx, ele) => {
        const $ele = $(ele)

        if(typeof($ele.attr("class"))=="undefined") {
          const href = $ele.find("h4 a").attr("href")

          urls.push(href)
          // api.push({
          //   id: href.split("").slice(27,34).join(""),
          //   title: $ele.find("h4 a").text().trim(),
          //   href: href,
          //   upTime: $ele.find(".other-left a").eq(0).text().trim(),
          //   via: $ele.find(".comeFrom a").text().trim(),
          // })
        }
      })

      // res.send(api)

      let ep = new eventproxy()

      // ep.after("voice_html", api.length, (voice) => {
      //   voice = voice.map((voice_item) => {
      //     let id = voice_item[0]
      //   })
      // })

      ep.after('voice_html', urls.length, (voice) => {
        voice = voice.map((voice_item) => {
          let $ = cheerio.load(voice_item)
          return ({
            href: voice_item,
            title: $('.headline').text().trim(),
            // first_comment: $('#readfloor td').eq(0).text().trim()
          })
        })

        console.log(11)
        res.send(voice)
      })
      //
      urls.slice(0, 5).forEach((voice_url) => {
        superagent.get(voice_url)
          .end((err, sres) => {
            console.log('fetch' + voice_url + 'successful')
            ep.emit('topic_html', [voice_url, sres.text])
          })
      })
    })
})

module.exports = app
