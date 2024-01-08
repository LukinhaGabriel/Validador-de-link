import chalk from "chalk";

function extractLinks(arrLinks){
    return arrLinks.map(objectLink => Object.values(objectLink).join())

}

async function checkState(listURLs){
    const arrStates = await Promise
    .all(
        listURLs.map(async (url) => {
            try{
                const response = await fetch(url, { method: "HEAD" });
                return `${response.status} - ${response.statusText}`;
            } catch(error){
                return handlesErrors(error);
            }
        })
    );
    return arrStates;
}

function handlesErrors(error){
    if(error.cause.code === "ENOTFOUND"){
        return "Link não encontrado";
    } else{
        return "Ocorreu algum erro";
    }
}

export default async function validatedList(listoflinks){
    const links = extractLinks(listoflinks);
    const state = await checkState(links);
    return listoflinks.map((object, index) => ({
        ...object,
        state: state[index]
    })); 
}

