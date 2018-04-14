// netlifyに必要なファイル_headersをpublicで生成する (通常は_で始まるファイルは無視されるが、下記コードでpublicに生成できるようになる)
hexo.extend.generator.register('netlify-headers', function(locals){
  var fs = require('hexo-fs');
  var pathFn = require('path');
  var data = fs.readFileSync( pathFn.join( process.env.PWD || process.cwd() , '_headers'));
  return {
    path: "_headers",
    data: data
  };
});
