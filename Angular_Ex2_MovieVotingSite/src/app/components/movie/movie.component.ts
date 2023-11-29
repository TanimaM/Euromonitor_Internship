import { Component } from '@angular/core';
import { iMovie, movies } from 'src/app/models/movies.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  movies: iMovie[] = movies;

  public vote(movie: iMovie): void {
    movie.voted ? (movie.voted = false, alert('Unvoted for ' + movie.title)) 
    : (movie.voted = true, alert('Voted for ' + movie.title));

    this.movies.forEach((m) => {
      if (m !== movie) {
        m.voted = false;
      }
    });
  }
}