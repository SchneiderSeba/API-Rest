/* eslint-disable no-undef */
const http = require('node:http')
const fs = require('node:fs')

// const { findFreePort } = require('./free-port.js')

const port = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1>Server On</h1>')
  } else if (req.url === '/contact') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({
      nombre: 'Jorge',
      apellido: 'Gonzalez',
      edad: 25,
      email: 'jorge@gmail.com'
    }))
  } else if (req.url === '/images') {
    res.statusCode = 200
    fs.readFile('./img.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end('<h1>404 Not Found</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`)
})
