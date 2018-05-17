const favicons = require('favicons');

function handleFaviconsResult(err, result) {
  console.log('Favicon Result! ', result);
  if (err) {
    return this.reject(err);
  }
}

module.exports.generate = function generate(plugin) {
  console.log('Generating ', plugin.config.logo);
  return new Promise((resolve, reject) => {
    console.log('Import Favicons');
    return favicons(
      plugin.config.logo,
      plugin.config.favicons || {},
      handleFaviconsResult.bind({
        resolve,
        reject,
        plugin,
      }),
    );
  });
};
