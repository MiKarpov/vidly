import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';

import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import GroupList from './common/groupList';
import SearchBox from './common/searchBox';

import paginate from '../utils/paginate';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class Movies extends Component {
  state = {
    isLoaded: false,
    genres: [],
    movies: {},
    searchQuery: '',
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortBy: { column: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: '', name: 'All Genres' }, ...data];

    const { data: movies } = await getMovies();

    this.setState({ movies, genres, isLoaded: true });
  }

  render() {
    if (!this.state.isLoaded) return <p>Loading...</p>;

    const totalMovies = this.state.movies.length;
    if (totalMovies === 0) return <p>There are no movies in database</p>;

    const currentPage = this.state.currentPage;
    const pageSize = this.state.pageSize;
    const genres = this.state.genres;
    const selectedGenre = this.state.selectedGenre;

    // Search or filter movies by genre
    let filteredMovies = this.state.movies;
    if (this.state.searchQuery) {
      filteredMovies = this.state.movies.filter((m) =>
        m.title.toLowerCase().startsWith(this.state.searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre.id) {
      filteredMovies = this.state.movies.filter((m) => m.genre.id === selectedGenre.id);
    }

    // Sort movies
    const sortBy = this.state.sortBy;
    const sortedMovies = _.orderBy(filteredMovies, [sortBy.column], [sortBy.order]);

    const moviesPage = paginate(sortedMovies, currentPage, pageSize);
    const totalMoviesShown = sortedMovies.length;

    return (
      <div className='row'>
        <div className='col-3'>
          <GroupList
            items={genres}
            textProperty='name'
            valueProperty='id'
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          <Link to='/movies/new' className='btn btn-primary' style={{ marginBottom: 20 }}>
            Add new
          </Link>
          <p>
            Showing {totalMoviesShown} of {totalMovies} movies
          </p>
          <SearchBox searchQuery={this.state.searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={moviesPage}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            totalItems={totalMoviesShown}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  handleDelete = async (movieId) => {
    const originalMovies = this.state.movies;
    const newMovies = originalMovies.filter((m) => m.id !== movieId);
    this.setState({ movies: newMovies });

    try {
      await deleteMovie(movieId);
    } catch (ex) {
      this.setState({ movies: originalMovies });

      if (ex.response && ex.response.status === 404) {
        toast.error('This movie was previosuly deleted');
      }
    }
  };

  handleLike = (movie) => {
    console.log('Toggling like', movie);

    let newMovies = [...this.state.movies];
    const index = newMovies.indexOf(movie);
    newMovies[index].liked = !newMovies[index].liked;
    this.setState({ movies: newMovies });
  };

  handlePageChange = (page) => {
    console.log('Changing page', page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    console.log('Selected genre', genre);
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: '' });
  };

  handleSearch = (query) => {
    console.log('Searching movie', query);
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (column) => {
    const sortBy = { ...this.state.sortBy };
    if (sortBy.column === column) {
      console.log('Togglng sort by', column);
      sortBy.order = sortBy.order === 'asc' ? 'desc' : 'asc';
    } else {
      console.log('Sorting in ascending order by', column);
      sortBy.column = column;
      sortBy.order = 'asc';
    }

    this.setState({ sortBy });
  };
}

export default Movies;
