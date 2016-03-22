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

export default function(cb) {
  console.log('loading');
  loadScript('/extension/data/public/main.js', function() {
    console.log('done');
    cb();
  });
}