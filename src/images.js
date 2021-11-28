import {countryFlagMap, fullFlagMap} from "./constants";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("./flags", false, /\.(png|jpe?g|svg)$/)
);

const newImages = importAll(
  require.context("./flags/newflags", false, /\.(png|jpe?g|svg)$/)
);

export function getFlagForCountry(country) {
  return images[countryFlagMap[country.toLowerCase()]];
}

export function getFlagForCountryNew(country) {
  return "https://hatscripts.github.io/circle-flags/flags/"+country.toLowerCase()+".svg";
}

export const envelopeImg = images["envelope.png"]