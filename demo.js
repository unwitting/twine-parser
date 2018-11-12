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
    "chintokkong",
    "a-hypertext-night"
  );
  console.log(JSON.stringify(parsed, null, 2));
};

run();
