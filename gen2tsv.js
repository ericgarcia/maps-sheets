var fs = require('fs');
var _  = require('lodash');

var header = ['name', 'title', 'field_evolution', 'field_project_type', 'location']

var raw  = fs.readFileSync('gen-projects-output.json', 'utf8');
var items = JSON.parse(raw);

var output = header.join('\t')+'\n';
_.forEach(items, function (item,i) {
  var a = item.attributes;
  a.location = a.latitude+','+a.longitude;
  line = _.map(header, function (key) {
    return a[key].replace(/([\r\n\t])/gm,"");
  })
  output += line.join('\t')+'\n';
})

fs.writeFileSync('gen-projects-output.tsv', output);
