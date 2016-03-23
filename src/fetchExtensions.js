function loadScript(url, callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = function() {
    callback();
  };

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

//require('./extension')(studio);

//development tam chci mit ten require, jak ho tam ale dostanu???
//start dev projde to vsechno a nasoube to nekam

//start prod udela neco podobneho, ale embedne tam ten script


export default function(cb) {
  console.log('loading');
  require('./dev-extensions-require.js');
  cb();
  //loadScript('/extension/data/public/main.js', function() {
  //  console.log('done');
  //  cb();
  //});
}