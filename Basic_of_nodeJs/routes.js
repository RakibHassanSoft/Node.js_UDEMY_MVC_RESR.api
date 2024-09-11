const fs = require('fs')
const requestHandler=((req,res)=>{

    const url = req.url;
    const method = req.method;
    if (url === '/') {
        //sending a html contnet
        res.write('<html>')
        res.write('<head><titile>Enter Messege</titile></head>')
        res.write('<body><form action ="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
    
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const body =[];
        req.on('data', (chunk)=>{
            console.log(chunk)
            body.push(chunk);
        });
        return req.on('end',()=>{
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody)
            const message = parseBody.split('=')[1];
            
            // fs.writeFileSync('message.text', message)
            // res.statusCode = 302;
            // res.setHeader('location', '/')
            // return res.end();
    
             fs.writeFile('message.txt',message,err=>{
                res.statusCode = 302;
                res.setHeader('location', '/')
                return res.end();
             })
    
        })
    }
    //sending a html contnet
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><titile></titile></head>')
    res.write('<body></h1>This is Hello</h1></body>')
    res.write('</html>')
    res.end();
})


// module.exports = requestHandler;
// module.exports ={
//     handler:requestHandler,
//     someText: "Some text"
// }

module.exports.handler = requestHandler;
