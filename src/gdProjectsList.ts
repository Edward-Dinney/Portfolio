export type Project = {
    image: string;        // thumbnail in the left grid
    previewImage: string; // image shown on the right when hovered — change this path to swap the preview
    url: string;
    title: string;
  };
  
  const projects: Project[] = [
    {
      image: require('./gd-assets/Screaming heads/reformate/star.png'),
      previewImage: require('./gd-assets/Screaming heads/Promo material/4.png'),
      url: 'https://edwarddinney.fyi/gd-projects/Screaming-Heads',
      title: 'Screaming Heads Merch & Campaign Visuals',
    },
    {
      image: require('./gd-assets/Scary Monsters/6.png'),
      previewImage: require('./gd-assets/Scary Monsters/4.png'),
      url: 'https://edwarddinney.fyi/gd-projects/Scary-Monsters',
      title: 'Scary Monsters Logo, Merch & Campagin Visuals',
    },
  
    {
      image: require('./gd-assets/Tees/stare.png'),
      previewImage: require('./gd-assets/Tees/insides.png'),
      url: 'https://edwarddinney.fyi/gd-projects/T-Shirts',
      title: 'T-Shirt Design Work',
    },

  ];
  
  export default projects;
  