import { useState } from "react";
// import { pathResolve } from '../file-system/';

import { resolve as pathResolve } from 'path';
import {
    // lstat,
    // mkdir,
    readdir,
    // readFile,
    // writeFile
  } from 'fs/promises';

// node index.mjs

const Index = async () => {
    
    const inPath = pathResolve('../src/');
    console.log("inPath", inPath);
    
    const itemNames = async () => {await readdir(inPath);}

    async function fileStats(path) {
        try {
            return await lstat(path);
        } catch {
            return null;
        }
    }

    async function readDirectory(path) {
        const itemNames = await readdir(path);
        const items = await Promise.all(itemNames.map(async (name) => {
            let itemPath = `${path}/${name}`
            const stats = await fileStats(itemPath);
        
            if (stats.isDirectory()) {
                return [`${itemPath}/`].concat(...await readDirectory(itemPath));
            }
        
            return [itemPath];
        }));
        
        return [].concat(...items);
    }

    console.log("readDirectory", readDirectory(inPath));

    // const items = async () => { await Promise.all(itemNames.map(async (name) => {
    //     let itemPath = `${path}/${name}`
    //     const stats = await fileStats(itemPath);
    
    //     if (stats.isDirectory()) {
    //       return [`${itemPath}/`].concat(...await readDirectory(itemPath));
    //     }
    
    //     return [itemPath];
    //   }));
    // }

    // console.log("items", items);

    
    // function delay(time) {
    //     return new Promise(resolve => setTimeout(resolve, time));
    // }

    // const router = useRouter();

    let content = null;

    //content = {inPath};
    console.log("itemNames",itemNames);
    content = {itemNames};

    return (
        content
    );
}

console.log(Index());

// export default Index;