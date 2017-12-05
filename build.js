var fs = require('fs');

var clean = function(file, destination) {
  fs.readFile(file, 'utf8', function(error, data) {
    if(error) throw error;

    data = data.replace(/(module\.exports\s*=\s*|var\s+[^\s]+\s*=\s*require\(['"][^'"]+['"]\)[^;\n]*[;\n]*)/g, '');

    fs.writeFile(destination, data, function(error) {
      if(error) throw error;
    });
  });
};

clean('index.js', 'dist/open-request.js');
clean('status.js', 'dist/status.js');
clean('http-response.js', 'dist/http-response.js');

fs.readFile('index.js', 'utf8', function(error, data) {
  if(error) throw error;

  data = data.replace("var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;\n", '');

  fs.writeFile('dist/index.js', data, function(error) {
    if(error) throw error;
  });
});
