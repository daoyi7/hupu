const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy');
const url = require('url')
const path = require('path');
const hc = 'https://bbs.hupu.com'

const app = express()
const port = 7777

app.listen(port, () => {
  console.log('hupu API is running @' + port)
})

app.use(express.static(path.join(__dirname, '/public/components/')))

/**********************************分区类型 API********************************/

app.use('/all', require('./router/all/all'))

/************************************板块 API**********************************/

app.use('/', require('./router/group/group'))

/**
**  贴子详情 api
**/
app.use('/t', require('./router/detail/detail'))
