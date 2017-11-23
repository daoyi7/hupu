// const express = require('express')
// const superagent = require('superagent')
// const cheerio = require('cheerio')
// const eventproxy = require('eventproxy');
// const url = require('url')
// const hc = 'https://voice.hupu.com/nba'
//
// const app = express()
//
// app.get('/', (req, res, next) => {
//   superagent.get(hc)
//     .end((err, sres) => {
//       if(err) {
//         console.error(err)
//       }
//
//       const $ = cheerio.load(sres.text)
//       let urls = []
//
//       $(".news-list li").slice(0, 20).each((idx, ele) => {
//         const $ele = $(ele)
//
//         if(typeof($ele.attr("class"))=="undefined") {
//           const href = $ele.find("h4 a").attr("href")
//
//           urls.push(href)
//         }
//       })
//
//       let ep = new eventproxy()
//
//       urls.forEach((voice_url) => {
//         superagent.get(voice_url)
//           .end((err, sres) => {
//             ep.emit('voice_html', [voice_url, sres.text])
//           })
//       })
//
//       ep.after('voice_html', urls.length, (url) => {
//         url = url.map((url_item) => {
//           let href = url_item[0]
//           let html = url_item[1]
//           let $ = cheerio.load(html)
//
//           return ({
//           href: href,
//             id: href.split("").slice(27,34).join(""),
//             title: $('.headline').text().trim(),
//             upTime: $(".artical-info a.time span").eq(0).text().trim(),
//             source: $(".comeFrom a").eq(0).text().trim(),
//             thumb: $('.artical-importantPic img').eq(0).attr("src"),
//             info: $('.artical-main-content p').eq(0).text().trim()
//           })
//         })
//
//         res.send(url)
//       })
//     })
// })
//
// module.exports = app

const async = require('async')
const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const url = require('url')
const hc = 'https://voice.hupu.com/nba'

const app = express()

app.get('/', (req, res, next) => {
  superagent.get(hc)
    .end((err, sres) => {
      if (err) {
        console.error(err)
      }

      const $ = cheerio.load(sres.text)
      let urls = []

      $(".news-list li").each((idx, ele) => {
        const $ele = $(ele)

        if (typeof($ele.attr("class")) == "undefined") {
          const voice_href = $ele.find("h4 a").attr("href")
          const bbs_href = $ele.find(".other-right a").attr("href")

          urls.push({
            id: idx,
            voice_url: voice_href,
            bbs_url: bbs_href,
          })
        }
      })

      let concurrencyCount = 0

      const fetchUrl = (url, callback, index) => {
        let delay = parseInt((Math.random() * 10000000) % 2000, 10)

        concurrencyCount++

        setTimeout(() => {

          concurrencyCount--

          superagent.get(url)
            .end((err, sres) => {
              if (err) {
                console.error("我要看这个：" + err)
              }

              let $ = cheerio.load(sres.text)

              callback(null, {
                href: url,
                id: url.split("").slice(27, 34).join(""),
                title: $('.headline').text().trim(),
                upTime: $(".artical-info a.time span").eq(0).text().trim(),
                source: $(".comeFrom a").eq(0).text().trim(),
                thumb: $('.artical-importantPic img').eq(0).attr("src"),
                info: $('.artical-main-content p').eq(0).text().trim(),
                urls: urls[index >= 17 ? index - 1 : index]
              })
            })

        }, delay)
      }

      async.mapLimit(urls, 5, (url, callback, index) => {
        fetchUrl(url.voice_url, callback, url.id)
      }, (err, result) => {
        res.send(result)
      })
    })
})

module.exports = app
