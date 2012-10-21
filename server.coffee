connect = require 'connect'
app = connect()

app.use connect.logger(format:"dev")
app.use connect.static('public')

app.use connect.errorHandler()

port = process.env.PORT || 3001
app.listen port

console.log "server started on port #{port}"