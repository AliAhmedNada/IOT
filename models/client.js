// Node.js socket client script
try {
    const net = require('net');
    const dotenv = require('dotenv');
    dotenv.config();

    var stdin = process.openStdin();
    // Connect to a server @ port 9898
    const client = net.createConnection({
        port: process.env.PORT
    }, () => {
        //client.write('Receiver Online');
        console.log("Driver online")
        stdin.addListener("data",function (d) {
            client.write(d);
        });
    });
    client.on('data', (data) => {
        setTimeout(noop = () => {}, 900);
        console.log(data.toString());
    });

    client.on('end', () => {
        console.log('client: I disconnected from the server.');
        console.log('client: Shutting Down');
        client.end();
        process.exit()
    });

} catch (error) {
    console.error(error);
}