export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms: {
    png?: string;
    svg?: string;
  };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  area: number;
  timezones: string[];
  continents: string[];
  car: {
    side: string;
  };
  idd: {
    root: string;
    suffixes?: string[];
  };
  motto?: string;
  religion?: string;
  government?: string;
  independence?: string;
  gdp?: string;
  latlng: number[];
  maps: {
    openStreetMaps: string;
    googleMaps: string;
  };
  demonyms?: {
    eng: {
      f: string;
      m: string;
    };
    fra?: {
      f: string;
      m: string;
    };
  };
}

const CountryType: Country = {
  name: {
    common: '',
    official: '',
  },
  region: '',
  population: 0,
  flags: {
    png: '',
    svg: '',
  },
  coatOfArms: {},
  area: 0,
  timezones: [],
  continents: [],
  car: {
    side: '',
  },
  idd: {
    root: '',
  },
  latlng: [],
  maps: {
    openStreetMaps: '',
    googleMaps: '',
  },
};

export default CountryType;
