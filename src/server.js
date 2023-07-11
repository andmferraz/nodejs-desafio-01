import http from 'node:http'

const server = http.createServer(async (req, res) => {
    return res.end('Server running...')
})

server.listen(3334)