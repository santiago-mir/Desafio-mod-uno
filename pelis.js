const fs = require("fs");

//Devuelve todas las peliculas
const getAll = function () {
  const buffer = fs.readFileSync(__dirname + "/pelis.json");
  const peliculas = JSON.parse(buffer.toString());
  return peliculas;
};

//Filtra las peliculas que incluyan al argumento "texto" en su titulo
const searchBy = function (texto, arrayDePelis) {
  var resultado = arrayDePelis.filter((x) =>
    x.title.toLowerCase().includes(texto.toLowerCase())
  );
  return resultado;
};

//Ordena de menor a mayor los valores numericos, y alfabeticamente los strings
const sortBy = function (propiedad, arrayDePelis) {
  var respuesta = arrayDePelis.sort((a, b) => {
    if (a[propiedad] > b[propiedad]) {
      return 1;
    }
    if (a[propiedad] < b[propiedad]) {
      return -1;
    }
  });
  return respuesta;
};

//Devuelve un objeto en formato JSON
const noFormat = function (obj) {
  return JSON.stringify(obj);
};

//Pasa a minuscula los strings de un array
const toLower = function (arr) {
  var resultado = arr.map((x) => x.toLowerCase());
  return resultado;
};

//Filtra las peliculas que tengan determinado tag
const searchTags = function (tag, array) {
  var resultado = array.filter((x) =>
    toLower(x["tags"]).includes(tag.toLowerCase())
  );
  return resultado;
};

//Ejecuta las funciones segun los parametros que le pasen, si no se pasan parametros devuelve todas las peliculas
exports.searchByCriteria = function (criterios) {
  var resultado = getAll();

  if (criterios.hasOwnProperty("search")) {
    resultado = searchBy(criterios.search, resultado);
  }
  if (criterios.hasOwnProperty("sort")) {
    resultado = sortBy(criterios.sort, resultado);
  }
  if (criterios.hasOwnProperty("tag")) {
    resultado = searchTags(criterios.tag, resultado);
  }
  if (criterios.hasOwnProperty("no-format")) {
    resultado = noFormat(resultado);
  }
  return resultado;
};
