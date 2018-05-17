import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
// import { promisify } from 'util';

/**
 * @this {WebpackLoader}
 * @param {AppManifestWebpackPluginOptions} options
 */
export async function get(options, cacheFile, hash, getFavicons) {
  if (options.cache) {
    const cacheFilePath = path.resolve(this._compiler.parentCompilation.compiler.outputPath, cacheFile);

    console.log('Cache File Path: ', cacheFilePath);

    fs.exists(cacheFilePath, exists => {
      console.log('Cache Exists? ', exists);
    });
  }

  const result = await getFavicons();

  // Do we want to cache the result before returning to caller?
  if (result && options.cache) {
    this.emitFile(
      cacheFile,
      JSON.stringify({
        hash,
        ohash: generateHashForOptions(options),
        result,
      }),
    );

    this.fs._stat(cacheFile, data => {
      console.log('Stats: ', data);
    });
  }

  return result;
}

/**
 * Generates a md5 hash for the given options
 */
function generateHashForOptions(options) {
  const hash = crypto.createHash('md5');
  hash.update(JSON.stringify(options));
  return hash.digest('hex');
}
