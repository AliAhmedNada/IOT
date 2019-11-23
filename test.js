var net = require('net');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config();
var server = net.createServer();

console.log("testing port " +process.env.PORT)
server.once('error', function(err) {
  if (err.code === 'EADDRINUSE') {
    // port is currently in use
    console.log(chalk.red("Port "+process.env.PORT+" is used please check it or use Another port\n"))
  }
});

server.once('listening', function() {
  // close the server if listening doesn't fail
  console.log(chalk.green("port is empty please proceed "))
  server.close();
});

server.listen(process.env.PORT);