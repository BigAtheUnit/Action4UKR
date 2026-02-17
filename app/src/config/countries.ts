import type { CountryConfig } from '../types';

export const countries: CountryConfig[] = [
  {
    code: 'UK',
    name: 'United Kingdom',
    flag: '\u{1F1EC}\u{1F1E7}',
    description: 'Contact your Member of Parliament',
    searchType: 'postcode',
    chamberName: 'House of Commons',
  },
  {
    code: 'FR',
    name: 'France',
    flag: '\u{1F1EB}\u{1F1F7}',
    description: "Contact your d\u{00E9}put\u{00E9} in the Assembl\u{00E9}e nationale",
    searchType: 'filter',
    chamberName: 'Assembl\u{00E9}e nationale',
  },
  {
    code: 'EU',
    name: 'European Union',
    flag: '\u{1F1EA}\u{1F1FA}',
    description: 'Contact your Member of the European Parliament',
    searchType: 'filter',
    filterLabel: 'Member State',
    filterField: 'member_state',
    chamberName: 'European Parliament',
  },
];
