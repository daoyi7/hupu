const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const url = require('url')
const async = require('async')

const app = express()
const nba = 'http://www.stat-nba.com'

app.get('/',(req, res, next) => {
  superagent.get(nba + '/index.php')
    .end((err, sres) => {
      if(err) {
        console.error(err)
      }

      const $ = cheerio.load(sres.text)
      let urls = []

      $(".stat_box").eq(1).find("tr").slice(1).each((idx, ele) => {
        const $ele = $(ele)

        urls.push({
          id: idx,
          area: '东部',
          rank: idx + 1,
          team_href: url.resolve(nba, $ele.find("td").eq(0).find("a").attr("href")),
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

        urls.push({
          id: idx + 15,
          area: '西部',
          rank: idx + 1,
          team_href: url.resolve(nba, $ele.find("td").eq(0).find("a").attr("href")),
          team: $ele.find("td").eq(0).text().trim(),
          win: $ele.find("td").eq(1).text().trim(),
          lose: $ele.find("td").eq(2).text().trim(),
          win_rate: $ele.find("td").eq(3).text().trim(),
          field_difference: $ele.find("td").eq(4).text().trim(),
          coach: $ele.find("td").eq(5).text().trim()
        })
      })

      let count = 0

      const fetchUrl = (url_item, callback, index) => {
        let delay = parseInt((Math.random() * 10000000) % 2000, 10)

        count++

        setTimeout(() => {

          count--

          superagent.get(url_item)
            .end((err, sres) => {
              if(err) {
                console.error(err)
              }

              let $ = cheerio.load(sres.text)

              callback(null, {
                team_img: url.resolve(nba, $(".intro").find("img").attr("src")),
                team_rank: urls[index]
              })
            })
        }, delay)
      }

      async.mapLimit(urls, 2000, (url_item, callback, index) => {
        fetchUrl(url_item.team_href, callback, url_item.id)
      }, (err, result) => {
        res.send(result)
      })
    })
})

module.exports = app
