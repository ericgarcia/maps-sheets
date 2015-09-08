var tj = require('togeojson');
var fs = require('fs');
var _  = require('lodash');
// node doesn't have xml parsing or a dom. use jsdom
var jsdom = require('jsdom').jsdom;

var filenameKml = process.argv[2]; //i.e. Leads.kml
var filenameTsv = filenameKml.split('.')[0]+'.tsv'

var header = ['name','contact','email','website','country','ambassador','location'];

var rawKml      = fs.readFileSync(filenameKml, 'utf8');
var converted   = tj.kml(jsdom(rawKml));

var properties  = _.pluck(converted.features,'properties');
var coordinates = _.pluck(converted.features,'geometry.coordinates')

var output = header.join('\t')+'\n';
_.forEach(properties, function (props,i) {
  props.location = coordinates[i][1]+','+coordinates[i][0];
  line = _.map(header, function (key) {
    return props[key].replace(/([\r\n\t])/gm,"");
  })
  output += line.join('\t')+'\n';
})

fs.writeFileSync(filenameTsv, output);
