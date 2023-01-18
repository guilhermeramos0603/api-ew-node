const http = require('http')

http.createServer((request, response) => {
    response.end('Hello Node!')
})

    .listen(4000, () => console.log('Running!'))