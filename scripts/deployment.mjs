import fs from 'node:fs/promises';
import path from 'node:path';
import {zipSync} from 'fflate';

export async function deploymentFiles(out) {
  const files={};
  async function add(relative){
    const absolute=path.join(out,relative);
    const stat=await fs.stat(absolute);
    if(stat.isDirectory()){
      for(const name of await fs.readdir(absolute))if(!name.startsWith('.'))await add(relative+'/'+name);
    }else files[relative]=new Uint8Array(await fs.readFile(absolute));
  }
  for(const entry of ['index.html','README.txt','h5'])await add(entry);
  // Fail the build rather than silently ship an entry with missing dependencies.
  for(const entry of ['index.html','h5/index.html','h5/h5.html']){
    const html=new TextDecoder().decode(files[entry]);
    for(const match of html.matchAll(/(?:src|href)="(\.\/[^"?#]+)[^"]*"/g)){
      const asset=path.posix.normalize(path.posix.join(path.posix.dirname(entry),match[1]));
      if(!files[asset])throw new Error(`部署包缺少资源：${entry} → ${asset}`);
    }
  }
  return files;
}
export async function writeDeploymentZip(out){
  const files=await deploymentFiles(out);
  const archive=out+'.zip';
  await fs.writeFile(archive,zipSync(files,{level:6}));
  console.log(`Deployment ZIP (${Object.keys(files).length} files): ${archive}`);
}
