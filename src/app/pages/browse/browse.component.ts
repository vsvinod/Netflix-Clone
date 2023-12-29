import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../types/user.type';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BannerComponent,
    MovieCarouselComponent,
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export default class BrowseComponent implements OnInit {
  private authService = inject(AuthService);
  movieService = inject(MovieService);
  user!: User;
  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated(),
  ];

  ngOnInit(): void {
    if (typeof window !== undefined) {
      const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')!);
      this.user = {
        name: loggedInUser.name,
        email: loggedInUser.email,
        profileImg: loggedInUser.picture,
      };
    }
    forkJoin(this.sources)
      .pipe(
        map(
          ([
            movies,
            tvShows,
            ratedMovies,
            nowPlaying,
            upcoming,
            popular,
            topRated,
          ]) => {
            // this.bannerDetail$ = this.movieService.getBannerDetail(movies.results[1].id);
            // this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[1].id);
            return {
              movies,
              tvShows,
              ratedMovies,
              nowPlaying,
              upcoming,
              popular,
              topRated,
            };
          }
        )
      )
      .subscribe((res: any) => {
        this.movies = res.movies.results as IVideoContent[];
        this.tvShows = res.tvShows.results as IVideoContent[];
        this.ratedMovies = res.ratedMovies.results as IVideoContent[];
        this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
        this.upcomingMovies = res.upcoming.results as IVideoContent[];
        this.popularMovies = res.popular.results as IVideoContent[];
        this.topRatedMovies = res.topRated.results as IVideoContent[];
        this.getMovieKey();
      });
  }
  getMovieKey() {
    // this.movieService.getBannerVideo(this.movies[0].id)
    // .subscribe(res=>{
    //   console.log(res);
    // })
  }

  signOut() {
    this.authService.signOut();
  }
}
