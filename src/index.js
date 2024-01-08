import fs from "fs";
import chalk from "chalk";


function extractLinks(text){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const captures = [...text.matchAll(regex)];
    const result = captures.map(capture => ({[capture[1]]: capture[2]}));
    return result.length !== 0 ? result : "Não a links no Arquivo";
}


function treatError(err){
    console.log(err);
    throw new Error(chalk.red(err.code, 'Arquivo Enexistente'));
}


//Código Assíncrono

//Async Await
async function getFile(filePath){
    const enconding = "utf-8";
    try{
        const text = await fs.promises.readFile(filePath, enconding);
        const arrayLinks = extractLinks(text);
        return arrayLinks;
    } catch(error){
        treatError(error);
    }
}


export default getFile;

