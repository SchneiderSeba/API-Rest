const net = require('node:net')

function findFreePort (port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.listen(port, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(findFreePort(0).then(port => resolve(port)))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { findFreePort }
