const pelis = require("./pelis");

function parsearARGV(argv) {
  var input = argv.slice(2);
  var objeto = {};
  input.forEach(function (value, index) {
    if (value.startsWith("--")) {
      objeto[value.slice(2)] = input[index + 1];
    }
  });
  return objeto;
}

function main() {
  var commands = parsearARGV(process.argv);

  var result = pelis.searchByCriteria(commands);
  console.table(result);
}

main();
