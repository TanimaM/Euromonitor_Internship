export interface iMovie {
    title: string;
    poster: string;
    voted: boolean;
  }
  
  export const movies: iMovie[] = [
    { title: 'Blue Beetle', poster: 'assets/Posters/BB.jpg', voted: false },
    { title: 'Dungeons & Dragons Honor Among Thieves', poster: 'assets/Posters/D&D.jpg', voted: false },
    { title: 'The Flash', poster: 'assets/Posters/Flash.jpg', voted: false },
    { title: 'Indiana Jones and the Dial of Destiny', poster: 'assets/Posters/IJ.jpg', voted: false }
  ];
  