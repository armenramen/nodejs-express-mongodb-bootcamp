const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replace-template');

// const message = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(message);


// const textOut = `This is what we know about avocado: ${message}.\n Created on: ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');


// Async
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}` ,'utf-8', (err) => {
//                 console.log('File has been written');
                
//             })
//         });

//     });
// });
// console.log('Reading file...');

//////////////////////////////////////////////////
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview-template.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card-template.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product-template.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname} = url.parse(req.url, true);

    // Overivew
    if (pathname === '/' || pathname === '/overview') {
        const cardsHtml = dataObj.map(product => replaceTemplate(tempCard, product)).join('');
        const output = tempOverview.replace(/%CARDS%/g, cardsHtml);
        
        res.writeHead(200, { 'Content-type': 'text/html' })
        res.end(output);
    
    // Product
    } else if (pathname === '/product') {
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.writeHead(200, { 'Content-type': 'text/html' })
        res.end(output);

    // Api
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(data);  

    // Not Found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'custom-header': 'ttest'
        });
        res.end('<h1>Page not found</h1>');
    }
    
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to server requests.');
});


