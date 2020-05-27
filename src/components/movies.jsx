import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import GroupList from "./common/groupList";
import paginate from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  render() {
    const totalMovies = this.state.movies.length;
    if (totalMovies === 0) return <p>There are no movies in database</p>;

    const currentPage = this.state.currentPage;
    const pageSize = this.state.pageSize;
    const moviesPage = paginate(this.state.movies, currentPage, pageSize);
    const genres = this.state.genres;

    return (
      <div className="row">
        <div className="col-2">
          <GroupList items={genres} onItemSelect={this.handleGenreSelect} />
        </div>
        <div className="col">
          <p>Showing {totalMovies} movies</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {moviesPage.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie._id)}
                      className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalItems={totalMovies}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  handleDelete = (movieId) => {
    const newMovies = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies: newMovies });
  };

  handleLike = (movie) => {
    let newMovies = [...this.state.movies];
    const index = newMovies.indexOf(movie);
    newMovies[index].liked = !newMovies[index].liked;
    this.setState({ movies: newMovies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = () => {};
}

export default Movies;
