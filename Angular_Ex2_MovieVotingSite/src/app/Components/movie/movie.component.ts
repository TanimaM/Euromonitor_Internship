import { Component } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  movies = [
    { title: 'Blue Beetle', poster: 'assets/Posters/BB.jpg', voted: false },
    { title: 'Dungeons & Dragons Honor Among Thieves', poster: 'assets/Posters/D&D.jpg', voted: false },
    { title: 'The Flash', poster: 'assets/Posters/Flash.jpg', voted: false },
    { title: 'Indiana Jones and the Dial of Destiny', poster: 'assets/Posters/IJ.jpg', voted: false }
  ];

  public selectedMovieIndex: number | null = null;

  public vote(movie: any, index: number): void {
    if (!movie.voted) {
      movie.voted = true;
      alert('Voted for ' + movie.title);
      this.selectedMovieIndex = index;
    } else {
      movie.voted = false;
      alert('Unvoted for ' + movie.title);
      this.selectedMovieIndex = null;
    }
  }

  public isButtonDisabled(index: number): boolean {
    return this.selectedMovieIndex !== null && this.selectedMovieIndex !== index;
  }
}
