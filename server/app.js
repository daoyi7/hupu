const express = require('express')
const path = require('path');

const app = express()
const port = 7777

app.listen(port, () => {
  console.log('hupu API is running @' + port)
})

app.use(express.static(path.join(__dirname, '/public/components/')))

/**********************************分区类型 API********************************/

app.use('/api/all', require('./router/all/all'))

/************************************板块 API**********************************/

app.use('/api/team', require('./router/group/group'))

/**********************************滚动新闻 API*********************************/

app.use('/api/voice', require('./router/voice/voice'))

/**********************************贴子详情 API*********************************/

app.use('/api/t', require('./router/detail/detail'))
