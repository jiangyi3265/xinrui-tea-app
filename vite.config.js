import {createRequire} from 'node:module';
import path from 'node:path';
import {recoveredH5Plugin} from './scripts/hbuilder-plugin.mjs';
// HBuilderX keeps its compiler packages outside the project. Resolve from its
// supplied compiler context; ordinary ESM imports do not honor NODE_PATH.
const compilerRequire=createRequire(path.resolve(process.env.UNI_CLI_CONTEXT || '.', 'package.json'));
const uniModule=compilerRequire('@dcloudio/vite-plugin-uni');
const uni=uniModule.default || uniModule;
export default {plugins:[uni(),recoveredH5Plugin()]};
