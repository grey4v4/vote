
const express = require('express')
const app = express()
const readline = require('readline')  //交互式控制台输入东西的

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/comt-test.html')
})

let pendingRequests = []
app.get('/boardcast', (req, res, next) => {
  pendingRequests.push(res) //把响应存起来
})


app.listen(5000, () => {
  console.log('listening on port', 5000)
})

const rl = readline.createInterface({
  input: process.stdin,   //读取数据
  output: process.stdout,   
})
 
start()

async function start() {
  for await (let line of rl) {
    pendingRequests.forEach(res => {
      res.end(line)
    })
  }
}