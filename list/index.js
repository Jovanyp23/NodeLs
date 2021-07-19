#!/usr/bin/env node
const fs = require('fs'); 
const { resolve } = require('path');
const { async } = require('q');
const chalk = require('chalk'); 
const path = require('path'); 

const { lstat } =fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
    if(err){
        console.log(err); 
    }


    const statPromises = filenames.map(filename =>{
        return lstat(path.join(targetDir, filename));
    });

    const allStats =await Promise.all(statPromises); 
    
    for (let stats of allStats){
        const index =allStats.indexOf(stats);
        if(stats.isFile()){
            console.log(chalk.red(filenames[index]));
        } else {
                console.log(filenames[index]); 
        }
    
    }

    //bad code done?
    //console.log(filenames); 
});

//const lstat = (filename) =>{
//    return new Promise((resolve, reject) => {
//        fs.lstat(filename, (err, stats)=> {
//            if (err){
//                reject(err);  
//            }

//            resolve(stats); 
//        })
//    })
//}