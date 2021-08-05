export const countries = [
  "unitedkingdom1984",
  "monaco2005",
  "bosniaherzegovina2003",
  "denmark2010nf",
  "romania2006",
  "russia1997",
  "hungary2018",
  "spain1969",
  "denmark2010",
  "netherlands1997",
  "malta1992",
  "israel1979",
  "germany1987",
  "netherlands2001",
  "norway2003",
  "sweden1997",
  "romania2008",
  "france2001",
  "norway2000",
  "russia2013",
  "spain1971",
  "israel1995",
];
export const countryNameMap = {
  unitedkingdom1984: "United Kingdom 1984",
  monaco2005: "Monaco 2005",
  bosniaherzegovina2003: "Bosnia & Herzegovina 2003",
  denmark2010nf: "Denmark 2010 NF",
  romania2006: "Romania 2006",
  russia1997: "Russia 1997",
  hungary2018: "Hungary 2018",
  spain1969: "Spain 1969",
  denmark2010: "Denmark 2010",
  netherlands1997: "The Netherlands 1997",
  malta1992: "Malta 1992",
  israel1979: "Israel 1979",
  germany1987: "Germany 1987",
  netherlands2001: "The Netherlands 2001",
  norway2003: "Norway 2003",
  sweden1997: "Sweden 1997",
  romania2008: "Romania 2008",
  france2001: "France 2001",
  norway2000: "Norway 2000",
  russia2013: "Russia 2013",
  spain1971: "Spain 1971",
  israel1995: "Israel 1995",
};
export const countryFlagMap = {
  unitedkingdom1984: "united-kingdom.png",
  monaco2005: "monaco.png",
  bosniaherzegovina2003: "bosnia-and-herzegovina.png",
  denmark2010nf: "denmark.png",
  romania2006: "romania.png",
  russia1997: "russia.png",
  hungary2018: "hungary.png",
  spain1969: "spain.png",
  denmark2010: "denmark.png",
  netherlands1997: "netherlands.png",
  malta1992: "malta.png",
  israel1979: "israel.png",
  germany1987: "germany.png",
  netherlands2001: "netherlands.png",
  norway2003: "norway.png",
  sweden1997: "sweden.png",
  romania2008: "romania.png",
  france2001: "france.png",
  norway2000: "norway.png",
  russia2013: "russia.png",
  spain1971: "spain.png",
  israel1995: "israel.png",
};

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
  //"Victoria",
  "Vladan",
  "Wiv",
  //"Jelena",
  //"Meg",
  //"Anthony",
];

export const audioMap = {};

export const magic_code = "raging";

export default countries;

export const currentEdition = "15";

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
