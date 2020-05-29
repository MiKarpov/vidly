import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: { id: "", title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
      genres: [],
      errors: {},
    };
  }

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ movie: this.mapToModelView(movie) });
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.movie.id === "" ? "New movie" : "Edit Movie "}</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={this.state.movie.title}
              onChange={this.handleChange}
              placeholder="Enter movie title"
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} md="4" controlId="genreId">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                name="genreId"
                value={this.state.movie.genreId}
                onChange={this.handleChange}>
                <option value="" />
                {this.state.genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="numberInStock">
              <Form.Label>In Stock</Form.Label>
              <Form.Control
                type="number"
                name="numberInStock"
                value={this.state.movie.numberInStock}
                onChange={this.handleChange}
                // placeholder="Enter movie title"
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="dailyRentalRate">
              <Form.Label>Rate</Form.Label>
              <Form.Control
                name="dailyRentalRate"
                value={this.state.movie.dailyRentalRate}
                onChange={this.handleChange}
                placeholder="Enter daily rental rate"
              />
            </Form.Group>
          </Form.Row>

          <Button type="submit">Save</Button>
        </Form>
      </React.Fragment>
    );
  }

  mapToModelView = (movie) => {
    return {
      id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log("Movie saved", this.state.movie);
  };

  handleChange = (event) => {
    const movie = this.state.movie;
    movie[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ movie });
  };
}

export default MovieForm;
