import getFile from "./index.js";
import fs from "fs";
import chalk from "chalk";
import validatedList from "./validacao-http.js";

const path = process.argv;

async function printList(valida, result, identifier){
    if(valida){
        console.log(
            chalk.yellow("lista validada:"), 
            chalk.black.bgGreen(identifier),
            await validatedList(result));
    } else{
        console.log(
            chalk.yellow("lista de links:"), 
            chalk.black.bgGreen(identifier),
            result);
    }
}

async function textProcessing(argument){
    const path = argument[2];
    const valida = argument[3] === "valida";
    try{
        fs.lstatSync(path);
    } catch(error){
        if(error.code === "ENOENT"){
            console.log(chalk.red('Arquivo ou Diretório não existe'));
            return;
        }
    }
    if(fs.lstatSync(path).isFile()){
        const result = await getFile(path);
        const regex = /([^\/]+)$/gm;
        const fileName = path.match(regex);
        printList(valida, result, fileName);
    } 
    else if(fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path);
        files.forEach(async (fileName) => {
            const list = await getFile(path+"/"+fileName);
            printList(valida, list, fileName)
        })
    }
}

textProcessing(path);