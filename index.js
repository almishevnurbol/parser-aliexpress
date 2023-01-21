// const rp = require('request-promise');
const url = 'https://aliexitem.com/asp?productId=vVDNM%2BHcDzDU36Gi5X25JHWV2RDtYcWrqOgNqUTx%2B%2BfcvKVS6Irvtvo7FVMMS9wRS2nu4LeIRcldbp%2FUqSPd82%2B3hrAIEmSWJ%2F0iHRhbBdvj1LHX90h36McZo29clOvhVlXwoNPtixMxKDbDZObXaW5WCDluqyLSwirZapZ5KUDq1wvyBStR6idA9BV99u8zZUAv4GIr%2B1JgPOMb0wXtVtxMapy9l5gNJYVATGSH2Nw%3D';

// rp(url)
//   .then(function(html){
//     //success!
//     console.log(html);
//   })
//   .catch(function(err){
//     console.log(err)
//     //handle error
//   });


// // CHROME
// const chromium = require('chromium');
// const {execFile} = require('child_process');

// execFile(chromium.path, [url], err => {
// 	console.log('Hello Google!');
// });


const puppeteer = require('puppeteer')
async function login() {
  try {
      const URL = url
      const browser = await puppeteer.launch({headless: false})
      const page = await browser.newPage()

      await page.goto(URL, {waitUntil: 'domcontentloaded'})
      const result = await page.content()

      await browser.close()

      return result

  } catch (error) {
      console.error(error)
  }
}


const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const port = 5000

app.get('/', async (req, res) => {
  try {
      const response = {}
      response.html = await login()

      console.log(response)
      res.json(response)
  } catch (error) {
      res.json(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app