import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import GroupList from "./common/groupList";
import paginate from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    genres: [],
    movies: {},
    searchQuery: "",
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortBy: { column: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  render() {
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
    } else if (selectedGenre && selectedGenre._id) {
      filteredMovies = this.state.movies.filter((m) => m.genre._id === selectedGenre._id);
    }

    // Sort movies
    const sortBy = this.state.sortBy;
    const sortedMovies = _.orderBy(filteredMovies, [sortBy.column], [sortBy.order]);

    const moviesPage = paginate(sortedMovies, currentPage, pageSize);
    const totalMoviesShown = sortedMovies.length;

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
          <Link to="/movies/new" className="btn btn-primary" style={{ marginBottom: 20 }}>
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

  handleDelete = (movieId) => {
    console.log("Deleting movie", movieId);
    const newMovies = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies: newMovies });
  };

  handleLike = (movie) => {
    console.log("Toggling like", movie);

    let newMovies = [...this.state.movies];
    const index = newMovies.indexOf(movie);
    newMovies[index].liked = !newMovies[index].liked;
    this.setState({ movies: newMovies });
  };

  handlePageChange = (page) => {
    console.log("Changing page", page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    console.log("Selected genre", genre);
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSearch = (query) => {
    console.log("Searching movie", query);
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (column) => {
    const sortBy = { ...this.state.sortBy };
    if (sortBy.column === column) {
      console.log("Togglng sort by", column);
      sortBy.order = sortBy.order === "asc" ? "desc" : "asc";
    } else {
      console.log("Sorting in ascending order by", column);
      sortBy.column = column;
      sortBy.order = "asc";
    }

    this.setState({ sortBy });
  };
}

export default Movies;
