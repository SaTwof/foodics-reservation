require('dotenv').config()

const express = require('express')
const request = require('https')
const cors = require('cors')
const app = express()

const port = 3000

const sendNodeHttpsRequest = ({ data, ...options }) =>
  new Promise((resolve, reject) => {
    const _request = request.request(options, (response) => {
      if (response.statusCode !== 200) {
        reject({
          status: response.statusCode,
          data: response.statusMessage
        })
      }

      const chunks = []

      response.on('data', (data) => chunks.push(data))

      response.on('end', () => {
        const response = Buffer.concat(chunks)

        resolve(JSON.parse(response.toString()))
      })
    })

    _request.on('error', reject)

    if (data) {
      _request.write(JSON.stringify(data))
    }

    _request.end()
  })

app.use(cors())

app.use(express.json())

app.all('/*', async (req, res) => {
  try {
    const _res = await sendNodeHttpsRequest({
      data: req.body,
      method: req.method,
      hostname: 'api.foodics.dev',
      path: `/v5${req.url}`,
      headers: {
        origin: 'https://api.foodics.dev',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
      }
    })

    res.send(_res)
  } catch (e) {
    res.send({
      status: e?.response?.status ?? e?.status ?? 404,
      message: e?.message
    })
  }
})

app.listen(port, () => {
  console.log(`Proxy app listening on port ${port}`)
})
