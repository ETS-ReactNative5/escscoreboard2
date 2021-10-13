export const countries = ["unitedkingdom1972","latvia2000","bosniaandherzegovina2009","poland2016","greece2006","italy2011","turkey2008","serbiaandmontenegro2005","ireland1987","bulgaria2017","cyprus2010","georgia2016","australia2016","norway2013","france2021","hungary2007","iceland2019","ukraine2005","armenia2020","italy2012","azerbaijan2017","italy1987","macedonia2004","switzerland2009","spain1973",]
export const countryNameMap = {"unitedkingdom1972": "United Kingdom (1972)","latvia2000": "Latvia (2000)","bosniaandherzegovina2009": "Bosnia and Herzegovina (2009)","poland2016": "Poland (2016)","greece2006": "Greece (2006)","italy2011": "Italy (2011)","turkey2008": "Turkey (2008)","serbiaandmontenegro2005": "Serbia and Montenegro (2005)","ireland1987": "Ireland (1987)","bulgaria2017": "Bulgaria (2017)","cyprus2010": "Cyprus (2010)","georgia2016": "Georgia (2016)","australia2016": "Australia (2016)","norway2013": "Norway (2013)","france2021": "France (2021)","hungary2007": "Hungary (2007)","iceland2019": "Iceland (2019)","ukraine2005": "Ukraine (2005)","armenia2020": "Armenia (2020)","italy2012": "Italy (2012)","azerbaijan2017": "Azerbaijan (2017)","italy1987": "Italy (1987)","macedonia2004": "Macedonia (2004)","switzerland2009": "Switzerland (2009)","spain1973": "Spain (1973)",}
export const countryFlagMap = {"unitedkingdom1972": "united-kingdom.png","latvia2000": "latvia.png","bosniaandherzegovina2009": "bosnia-and-herzegovina.png","poland2016": "poland.png","greece2006": "greece.png","italy2011": "italy.png","turkey2008": "turkey.png","serbiaandmontenegro2005": "yugoslavia.png","ireland1987": "ireland.png","bulgaria2017": "bulgaria.png","cyprus2010": "cyprus.png","georgia2016": "georgia.png","australia2016": "australia.png","norway2013": "norway.png","france2021": "france.png","hungary2007": "hungary.png","iceland2019": "iceland.png","ukraine2005": "ukraine.png","armenia2020": "armenia.png","italy2012": "italy.png","azerbaijan2017": "azerbaijan.png","italy1987": "italy.png","macedonia2004": "macedonia.png","switzerland2009": "switzerland.png","spain1973": "spain.png",}
export const videomap = {"unitedkingdom1972": "01.m4v","latvia2000": "02.m4v","bosniaandherzegovina2009": "03.m4v","poland2016": "04.m4v","greece2006": "05.m4v","italy2011": "06.m4v","turkey2008": "07.m4v","serbiaandmontenegro2005": "08.m4v","ireland1987": "09.m4v","bulgaria2017": "10.m4v","cyprus2010": "11.m4v","georgia2016": "12.m4v","australia2016": "13.m4v","norway2013": "14.m4v","france2021": "15.m4v","hungary2007": "16.m4v",}


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
