const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function getLastMarketPlant(called = false) {
  const res = await fetch(
    "https://backend-farm-stg.plantvsundead.com/get-plants-filter-v2?offset=0&limit=5&type=1",
    {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHhlNmUyZDUwODNkNTRjODM3ZjA5YTMwNjc5ZjA4NjZmNTY0MjA1ZDI2IiwibG9naW5UaW1lIjoxNjMxNDQ0Mzc0NTA0LCJjcmVhdGVEYXRlIjoiMjAyMS0wOS0wOCAxNToyMTowMiIsImlhdCI6MTYzMTQ0NDM3NH0.5GjTWKXcvNGaHEit_x7gJyeGr9u1JOHuAA4gnz-v5SY",
      },
    }
  );
  const data = await res.json();
  const lastPlantPrice = data.data[0].startingPrice;

  if (lastPlantPrice < 50 && !called) {
    return `🚨🚨 ALERTA @conradocanas \n NFT PvU Regalado a: ${lastPlantPrice} PVUs`;
  }

  return `NFT PvU Barato \nPrecio NFT mas barato: ${lastPlantPrice} PVU`;
}

exports.getLastMarketPlant = getLastMarketPlant;
