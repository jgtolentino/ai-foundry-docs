const fs = require('fs');
const path = require('path');
const glob = (p)=>require('child_process').execSync(`git ls-files '${p}'`,{encoding:'utf8'}).trim().split('\n').filter(Boolean);
const files = [...glob('**/package.json')];
let bad = [];
for (const f of files) {
  try { JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch(e) { bad.push(`${f}: ${e.message}`); }
}
if (bad.length) {
  console.error('Invalid JSON detected:\n' + bad.map(x=>'- '+x).join('\n'));
  process.exit(1);
}
console.log('All package.json files are valid.');