// Node.js socket server script
// the Ports configured within .env file 

// import {RPIMessages} from './Messages.emun.js';

 const RpMessages = require('./Messages.enum')
try {

    const net = require('net');
    const dotenv = require('dotenv');
    dotenv.config();
    // Function that define controls 
    var command = {
        check: commandsent => {
            return commandsent === (('S')||('Send stable weight value')) ? RpMessages.control_1 :
                commandsent === 'S I' ? RpMessages.control_2 :
                commandsent === 'S +' ? RpMessages.control_3 :
                commandsent === 'S -' ? RpMessages.control_4 :
                null;
        }
    };
    
    // Create a server object
    const server = net.createServer(socket => {
        //socket.write('Server online');
        socket.on('data', data => {

            let array = []

            for (let input = 0; input < data.toString().split('').length; input++) {
                array.push("0x" + data.toString().split('')[input].charCodeAt(0).toString(16))
            }

            let check = command.check(data.toString().replace(/(\r\n|\n|\r)/gm, '')) 
            {
                check != null ? [
                        console.log("command recognized"),
                        socket.write("Command Sent :"+check)
                    ] :
                    ''
            }
            console.log('Received is [' + array + '] is ' + '"' + data.toString().replace(/(\r\n|\n|\r)/gm, "\\n") + '"')
            console.log("listening..")
            socket.write('Sent: '+'"'+data.toString().replace(/(\r\n|\n|\r)/gm, "\\n")+'"' );
        });
    }).on('error', (err) => {
        console.error(err);
    });
    server.listen(process.env.PORT, () => {
        console.log("Device Online")
        console.log("listening..")    });
    ''
} catch (error) {
    console.error(error);
}