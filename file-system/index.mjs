//cd /Library/WebServer/node-react/notes-app/file-system
// node index.mjs
//clear && printf '\e[3J'

import { resolve as pathResolve } from 'path';
import {
    lstat,
    // mkdir,
    readdir,
    // readFile,
    // writeFile
  } from 'fs/promises';


const Index = async () => {
    
    //const packageJsonSearch = /\/package.json$/;
    const packageJsonSearch = /pac/;

    async function getPackages(srcPath){
        const srcItemPaths = await readDirectory(srcPath);

        //return srcItemPaths;

        //console.log("srcItemPaths", srcItemPaths);

        return Promise.all(srcItemPaths.filter((item)=>
            packageJsonSearch.test(item)
            // console.log("itemLen", item.length)
            //item.length > 100
        ).map(async(itemGood)=>{return[itemGood]}))

        
        // return srcItemPaths
        // console.log(srcItemPaths);
        


    }

    // async function getItemNames(){
    //     const inPath = pathResolve('../src/');
    //     return await readdir(inPath);
    // }

    async function FileStat(filePath){
        try{
            return await lstat(filePath);
        }catch{
            return null;
        }

    }

    async function readDirectory(path){
        // const inPath = pathResolve('../src/');

        const itemNames = await readdir(path)
        // console.log("itemNames", itemNames);

        const items =  Promise.all(itemNames.map( async (fileName) => {
            let filePath = `${path}/${fileName}`;
            
            const stats = await FileStat(filePath);
            // console.log("stats", filePath, stats);
            //console.log("stats", filePath, stats.isDirectory());

            if(stats.isDirectory()){
                return [`${filePath}/`].concat(...await readDirectory(filePath));
            }
            return [filePath];

        }));

        return items;
        ///return [].concat(...items);

        //Ask Dustin why this is not working
        //I think this is causing it to only keep track of one level of recursive
        //return [].concat(...items);

    }

    //const inPath = pathResolve('../src/utils');
    const inPath = pathResolve('../src');
    //const inPath = pathResolve('../src/pages');

    console.log("readDirectory", await readDirectory(inPath));
    //console.log("getPackages", await getPackages(inPath));

}

await Index();