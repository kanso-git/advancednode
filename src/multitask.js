// by default the size is 4
process.env.UV_THREADPOOL_SIZE =5;

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const URL= 'https://www.google.com';
const start = Date.now();

// https call is not going throught the node  thread pool
function doRequest(){
    https.request(URL, res=>{
        res.on('data', () =>{});
        res.on('end',()=>{
            console.log(Date.now() - start);
        })
    }).end();
}

// crypto module goes through the node thread pool
function doHash(){
    crypto.pbkdf2('a','b', 100000, 512, 'sha512',()=>{
        console.log('hash:', Date.now() - start);
    });
}
doRequest();

// fs module goes through the node thread pool
// Important info: the reading process happens in 2 phases: 
    // phase 1: gathering imformations about the file in question
    // phase 2: get the content of the file 
fs.readFile('multitask.js', 'utf8',()=>{
    console.log('FS:',Date.now() - start);
})

// 4 times doHash
 doHash();
 doHash();
 doHash();
 doHash();