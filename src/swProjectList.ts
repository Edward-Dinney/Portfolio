export type Project = {
  image: string;
  url: string;
  title: string;
};

const projects: Project[] = [
  {
    image: require('./sw-projects/lookups poster.png'),
    url: 'https://look-ups.net/',
    title: 'Lookups',
  },
  {
    image: require('./sw-projects/Plush retro cover.png'),
    url: 'https://plushmagazine.org/',
    title: 'Plush Magazine',
  },
];

export default projects;
