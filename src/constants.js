export const countries = ["italy2012","thenetherlands2013","macedonia2004","russia2001","bosniaandherzegovina2009","spain1991","italy2021","ireland1987","italy2019","greece2006","italy2013","iceland2019","norway2015","germany2006","ireland1980","latvia2000","france2021","iceland1991","spain1973","france2017","latvia2015","norway2013","turkey2010","turkey2003","georgia2007","serbia2012",]
export const countryNameMap = {"italy2012": "Italy (2012)","thenetherlands2013": "The Netherlands (2013)","macedonia2004": "Macedonia (2004)","russia2001": "Russia (2001)","bosniaandherzegovina2009": "Bosnia and Herzegovina (2009)","spain1991": "Spain (1991)","italy2021": "Italy (2021)","ireland1987": "Ireland (1987)","italy2019": "Italy (2019)","greece2006": "Greece (2006)","italy2013": "Italy (2013)","iceland2019": "Iceland (2019)","norway2015": "Norway (2015)","germany2006": "Germany (2006)","ireland1980": "Ireland (1980)","latvia2000": "Latvia (2000)","france2021": "France (2021)","iceland1991": "Iceland (1991)","spain1973": "Spain (1973)","france2017": "France (2017)","latvia2015": "Latvia (2015)","norway2013": "Norway (2013)","turkey2010": "Turkey (2010)","turkey2003": "Turkey (2003)","georgia2007": "Georgia (2007)","serbia2012": "Serbia (2012)",}
export const countryFlagMap = {"italy2012": "italy.png","thenetherlands2013": "netherlands.png","macedonia2004": "macedonia.png","russia2001": "russia.png","bosniaandherzegovina2009": "bosnia-and-herzegovina.png","spain1991": "spain.png","italy2021": "italy.png","ireland1987": "ireland.png","italy2019": "italy.png","greece2006": "greece.png","italy2013": "italy.png","iceland2019": "iceland.png","norway2015": "norway.png","germany2006": "germany.png","ireland1980": "ireland.png","latvia2000": "latvia.png","france2021": "france.png","iceland1991": "iceland.png","spain1973": "spain.png","france2017": "france.png","latvia2015": "latvia.png","norway2013": "norway.png","turkey2010": "turkey.png","turkey2003": "turkey.png","georgia2007": "georgia.png","serbia2012": "serbia.png",}
export const videomap = {"italy2012": "01.m4v","thenetherlands2013": "02.m4v","macedonia2004": "03.m4v","russia2001": "04.m4v","bosniaandherzegovina2009": "05.m4v","spain1991": "06.m4v","italy2021": "07.m4v","ireland1987": "08.m4v","italy2019": "09.m4v","greece2006": "10.m4v","italy2013": "11.m4v","iceland2019": "12.m4v","norway2015": "13.m4v","germany2006": "14.m4v","ireland1980": "15.m4v","latvia2000": "16.m4v","france2021": "17.m4v","iceland1991": "18.m4v","spain1973": "19.m4v","france2017": "20.m4v","latvia2015": "21.m4v","norway2013": "22.m4v","turkey2010": "23.m4v","turkey2003": "24.m4v","georgia2007": "25.m4v","serbia2012": "26.m4v",}

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
