import path from 'node:path';
import {buildH5} from './build.mjs';
// This H5-only adapter preserves the recovered Vue 2 application instead of mixing
// its webpack runtime into the Vue 3 starter. It does not convert pages to native Vue SFCs.
export function recoveredH5Plugin(){
  let config;
  return {name:'xinrui-recovered-h5',enforce:'post',apply:'build',configResolved(value){config=value;},async closeBundle(){
    if(!['h5','web'].includes(process.env.UNI_PLATFORM||'h5'))return;
    await buildH5(path.resolve(config.root,config.build.outDir));
  }};
}
