export const countries = ["cyprus1988","thenetherlands2013","georgia2011","iceland2020","austria2000","spain1991","italy2021","russia2010","albania2012","iceland1997","italy2013","unitedkingdom1975","france1991","germany2006","ireland1980","germany2012","france2008","croatia2000","turkey2004","france2017","latvia2015","sweden2016","turkey2010","turkey2003","italy1983",]
export const countryNameMap = {"cyprus1988": "Cyprus (1988)","thenetherlands2013": "The Netherlands (2013)","georgia2011": "Georgia (2011)","iceland2020": "Iceland (2020)","austria2000": "Austria (2000)","spain1991": "Spain (1991)","italy2021": "Italy (2021)","russia2010": "Russia (2010)","albania2012": "Albania (2012)","iceland1997": "Iceland (1997)","italy2013": "Italy (2013)","unitedkingdom1975": "United Kingdom (1975)","france1991": "France (1991)","germany2006": "Germany (2006)","ireland1980": "Ireland (1980)","germany2012": "Germany (2012)","france2008": "France (2008)","croatia2000": "Croatia (2000)","turkey2004": "Turkey (2004)","france2017": "France (2017)","latvia2015": "Latvia (2015)","sweden2016": "Sweden (2016)","turkey2010": "Turkey (2010)","turkey2003": "Turkey (2003)","italy1983": "Italy (1983)",}
export const countryFlagMap = {"cyprus1988": "cyprus.png","thenetherlands2013": "netherlands.png","georgia2011": "georgia.png","iceland2020": "iceland.png","austria2000": "austria.png","spain1991": "spain.png","italy2021": "italy.png","russia2010": "russia.png","albania2012": "albania.png","iceland1997": "iceland.png","italy2013": "italy.png","unitedkingdom1975": "united-kingdom.png","france1991": "france.png","germany2006": "germany.png","ireland1980": "ireland.png","germany2012": "germany.png","france2008": "france.png","croatia2000": "croatia.png","turkey2004": "turkey.png","france2017": "france.png","latvia2015": "latvia.png","sweden2016": "sweden.png","turkey2010": "turkey.png","turkey2003": "turkey.png","italy1983": "italy.png",}
export const videomap = {"cyprus1988": "01.m4v","thenetherlands2013": "02.m4v","georgia2011": "03.m4v","iceland2020": "04.m4v","austria2000": "05.m4v","spain1991": "06.m4v","italy2021": "07.m4v","russia2010": "08.m4v","albania2012": "09.m4v","iceland1997": "10.m4v","italy2013": "11.m4v","unitedkingdom1975": "12.m4v","france1991": "13.m4v","germany2006": "14.m4v","ireland1980": "15.m4v","germany2012": "16.m4v","france2008": "17.m4v","croatia2000": "18.m4v","turkey2004": "19.m4v","france2017": "20.m4v","latvia2015": "21.m4v","sweden2016": "22.m4v","turkey2010": "23.m4v","turkey2003": "24.m4v","italy1983": "25.m4v",}

export const rankToPointsMap = {
  1: 12,
  2: 10,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
  18: 0,
  19: 0,
  20: 0,
  21: 0,
  22: 0,
  23: 0,
  24: 0,
  25: 0,
  26: 0,
  27: 0,
  28: 0,
  29: 0,
};

export const all_voters = [
  //"Aivis",
  "Aleksandra",
  //"Alex",
  //"Cecilia",
  "Costa",
  "Ed",
  //"Eirik",
  //"Hannah",
  "Hlynur",
  //"Lukáš",
  "Luke",
  "Maria",
  "Marko",
  "Matteo",
  //"Michael",
  "Miki",
  "Nathan",
  "Nick",
  "Oliver",
  "Pedro",
  "Peter",
  "Philip",
  "Rinor",
  //"Rita",
  "Rodrigo",
  "Simon",
  "Thomas",
  //"Tommy",
  "Victoria",
  "Vladan",
  "Wiv",
  //"Jelena",
  //"Meg",
  //"Anthony",
];

export const audioMap = {};

export const magic_code = "raging";

export default countries;

export const currentEdition = "17";

const edition_map = {
  yugo: 10,
  east: 7,
  west: 6,
  south: 8,
  north: 9,
  raging: 11,
};

export function edition_id(edition_name = "") {
  return currentEdition;
  // console.log("Edition "+ edition_name)
  // if (edition_name === "") {
  //   edition_name = currentEdition;
  // }
  //
  // if (edition_name in edition_map) {
  //   return edition_map[edition_name];
  // }
  // return 0;
}

export const edition_list = {
  west: [
    "germany2003",
    "belgium2006",
    "ireland2011",
    "france2010",
    "hungary2011",
  ],
  east: [
    "belarus2019",
    "ukraine2010",
    "moldova2010",
    "bulgaria2012",
    "latvia2020",
  ],
  south: [
    "greece2009",
    "cyprus2012",
    "israel2015",
    "spain2009",
    "portugal2014",
  ],
  north: [
    "iceland2008",
    "denmark2007",
    "norway2019",
    "sweden2008",
    "finland2009",
  ],
  yugo: [
    "slovenia2006",
    "croatia2006",
    "bosnia2004",
    "serbia2020",
    "macedonia2006",
  ],
  raging: countries,
};

export function get_countries(edition_name = "") {
  if (edition_name === "") {
    edition_name = currentEdition;
  }

  if (edition_name in edition_list) {
    return edition_list[edition_name];
  }
  return countries;
}

export const num_of_qualifiers = 10;

const country_to_edition_map = {
  germany2003: "west",
  belgium2006: "west",
  ireland2011: "west",
  france2010: "west",
  hungary2011: "west",
  belarus2019: "east",
  ukraine2010: "east",
  moldova2010: "east",
  bulgaria2012: "east",
  latvia2020: "east",
  greece2009: "south",
  cyprus2012: "south",
  israel2015: "south",
  spain2009: "south",
  portugal2014: "south",
  iceland2008: "north",
  denmark2007: "north",
  norway2019: "north",
  sweden2008: "north",
  finland2009: "north",
  slovenia2006: "yugo",
  croatia2006: "yugo",
  bosnia2004: "yugo",
  serbia2020: "yugo",
  macedonia2006: "yugo",
};

export function get_edtion_for_country(country) {
  return country_to_edition_map[country];
}
