const fs = require("fs");
const {
  parseHTML,
  parseURL,
  parsePhilomeLa,
  toCytoscapeGraph
} = require("./index");

const getDemoData = () => fs.readFileSync("./demo.html").toString();

const run = async () => {
  const parsed = await parsePhilomeLa(
    "plwmpo",
    "i-told-you-not-to-go-to-cat-mountain"
  );
  console.log(JSON.stringify(parsed, null, 2));
  // console.log(toCytoscapeGraph(parsed));
};

run();

console.log(JSON.stringify(parseHTML(getDemoData()), null, 2));