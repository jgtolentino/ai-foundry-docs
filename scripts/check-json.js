const fs=require('fs');const cp=require('child_process');
const files=cp.execSync("git ls-files '**/package.json'",{encoding:'utf8'}).trim().split('\n').filter(Boolean);
const bad=[];
for(const f of files){try{JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){bad.push(`${f}: ${e.message}`)}}
if(bad.length){console.error("Invalid JSON:\n"+bad.map(x=>"- "+x).join("\n"));process.exit(1)}
console.log("All package.json files are valid.")