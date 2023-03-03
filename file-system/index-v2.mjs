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
    
    const packageJsonSearch = /\/package.json$/;

    async function getPackages(srcPath){
        const srcItemPaths = await readDirectory(srcPath);

        return (srcItemPaths.filter((item)=>{
            packageJsonSearch.test(item)
        }).map((itemGood)=>{return[itemGood]}))

        
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
                // items.concat(readDirectory(filePath));
                return [`${filePath}/`].concat(... await readDirectory(filePath))
            }else{
                return [fileName];
            }

            
        }))

        return items;

    }

    const inPath = pathResolve('../src/utils');

    //console.log("readDirectory", await readDirectory(inPath));
    console.log("getPackages", await getPackages(inPath));

    let content = null;
    content = "some content";

    return (
        content
    );
}

console.log(Index());

// export default Index;