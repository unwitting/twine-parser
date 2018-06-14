const _ = require("lodash");
const cheerio = require("cheerio");
const cytoscape = require("cytoscape");
const request = require("request-promise-native");

const parseHTML = html => {
  const $ = cheerio.load(html);
  const passages = [];
  $("tw-passagedata").each((i, el) => {
    const pid = parseInt($(el).attr("pid"), 10);
    const name = $(el).attr("name");
    const text = $(el).text();
    const rawLinks = text.match(/\[\[[^\[\]]+\]\]/g) || [];
    const links = rawLinks
      .map(rawLink =>
        rawLink
          .replace("[[", "")
          .replace("]]", "")
          .split("|")
      )
      .map(([linkText, destinationName]) => ({
        text: linkText,
        destination: { name: destinationName || linkText }
      }));
    const passage = { pid, name, text, rawLinks, links };
    passages.push(passage);
  });
  passages.forEach(({ links }) => {
    links.forEach(link => {
      const destinationPasssage = _.find(
        passages,
        p => p.name === link.destination.name
      );
      if (destinationPasssage) {
        link.destination.pid = destinationPasssage.pid;
      }
    });
  });
  return { passages };
};

const parseURL = async url => {
  const html = await request(url);
  return parseHTML(html);
};

const parsePhilomeLa = (user, game) =>
  parseURL(`http://philome.la/${user}/${game}/play`);

const toCytoscapeGraph = parsedGame => {
  const { passages } = parsedGame;
  const nodes = [];
  let edges = [];
  passages.forEach(passage => {
    nodes.push({
      group: "nodes",
      data: {
        id: passage.pid,
        passage
      }
    });
    edges = [
      ...edges,
      ...passage.links.map(({ destination: { pid } }) => ({
        group: "edges",
        data: {
          id: `${passage.pid} -> ${pid}`,
          source: passage.pid,
          target: pid
        }
      }))
    ];
  });
  return cytoscape({
    elements: [...nodes, ...edges]
  });
};

module.exports = { parseHTML, parseURL, parsePhilomeLa, toCytoscapeGraph };
