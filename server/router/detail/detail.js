const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy');
const url = require('url')
const hc = 'https://bbs.hupu.com'

const app = express()

app.get('/', (req, res, next) => {
  // 获取路由携带的 query 参数
  const id = req.query.id
  // 根据参数来确定爬去的页面
  const detail_url = hc + '/' + id + '.html'

  superagent.get(detail_url)
    .end((err, sres) => {
      if (err) {
        res.send(err)
      }

      const $ = cheerio.load(sres.text)
      let api = []
      let comments_arr = []
      let likes = ($('.browse span').eq(1).text().trim()).split('')

      likes.shift()

      let comments = $(".floor").slice(1).each((idx, ele) => {
        comments_arr.push({
          floor: idx + 1 + '楼',
          username: $(ele).find(".u").text().trim(),
          reply_time: $(ele).find(".left span").eq(0).text().trim(),
          content: $(ele).find("td").text().trim(),
          likes_count: $(ele).find(".stime").eq(1).text().trim(),
          // title: post_title,
          // author: post_author,
          // create_time: post_time,
          // reply: post_reply,
          // view: post_view,
          // latest_reply: latest_reply,
        })
      })

      api.push({
        title: $('#j_data').attr("data-title"),
        replies_count: parseInt($('.browse span').eq(0).text().trim()),
        all_likes_count: parseInt(likes.join('')),
        comments: comments_arr
      })

      res.send(api)
    })
})

module.exports = app
