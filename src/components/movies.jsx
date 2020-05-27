import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import GroupList from "./common/groupList";
import paginate from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: 0 }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  render() {
    const totalMovies = this.state.movies.length;
    if (totalMovies === 0) return <p>There are no movies in database</p>;

    const currentPage = this.state.currentPage;
    const pageSize = this.state.pageSize;
    const genres = this.state.genres;
    const selectedGenre = this.state.selectedGenre;

    const filteredMovies =
      selectedGenre && selectedGenre._id !== 0
        ? this.state.movies.filter((m) => m.genre._id === selectedGenre._id)
        : this.state.movies;
    const moviesPage = paginate(filteredMovies, currentPage, pageSize);
    const totalMoviesFiltered = filteredMovies.length;

    return (
      <div className="row">
        <div className="col-3">
          <GroupList
            items={genres}
            textProperty="name"
            valueProperty="_id"
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>
            Showing {totalMoviesFiltered} of {totalMovies} movies
          </p>
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
            totalItems={totalMoviesFiltered}
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

  handleGenreSelect = (genre) => {
    console.log("Selected genre", genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
}

export default Movies;
