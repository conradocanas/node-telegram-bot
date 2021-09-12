const coinkidsConfig = require("../config/coinkids.json");
const { Scraper, Root, CollectContent } = require("nodejs-web-scraper");
const config = require("../config.json");

async function getNFTPrice(cryptoSymbol) {
  const scraper = new Scraper({
    ...coinkidsConfig,
    startUrl: coinkidsConfig.startUrl + cryptoSymbol + "/",
  });

  const root = new Root(); //The root object fetches the startUrl, and starts the process.

  const priceAlertPVU = new CollectContent(".col-lg-6 .row .info-box .line1", {
    name: "priceAlertPVU",
  }); //Opens each article page.
  root.addOperation(priceAlertPVU);

  await scraper.scrape(root);

  return priceAlertPVU.getData()[2];
}

async function getAllNFTsPrices() {
    return `NFTs Precios:\n
       ${config.nftList.reduce(async (acc, el) => {
         return (acc += `${el.toUpperCase()} - Precio: ${await getNFTPrice(
           el
         )}\n`);
       }, "")}
       `;
  }

exports.getNFTPrice = getNFTPrice;
exports.getAllNFTsPrices = getAllNFTsPrices;