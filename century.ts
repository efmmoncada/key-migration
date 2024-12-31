import fs from "fs";
import path from "path";

const filename = "century.tsv";
const file = fs.readFileSync(path.join('.', "data", filename), "utf8");

const lines = file.split("\n");

const [headers, ...data] = lines;


const keyQuantityMap = new Map<string, number>();

for (const fields of data.map(l => l.split("\t"))) {
    let keySymbol = fields[0];
    let qty = fields[5];

    if (!keySymbol) continue;

    const prevQ = keyQuantityMap.get(keySymbol);
    
    let key = keySymbol;
    if (key.includes("(")) key = key.slice(0, key.indexOf("("));
    if (key.includes(" ")) key = key.split("").filter(c => c !== " ").join(""); 
    keyQuantityMap.set(key, (prevQ || 0) + (Number(qty) || 0));

}

// console.log(keyQuantityMap)

const csvResult = toCSV(keyQuantityMap);
console.log(csvResult);



function toCSV(map: Map<string, number>): string {
    let csv = "";

    for (const [k, n] of map.entries()) {
        for (let i = 1; i <= n; i++) {
            csv += `${k},${i}\n`
        }
    }

    return csv;
}

