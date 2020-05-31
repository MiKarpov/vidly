import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: { _id: "", title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
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
        <h1>{this.state.movie._id === "" ? "New movie" : "Edit Movie "}</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={this.state.movie.title}
              onChange={this.handleChange}
              placeholder="Enter movie title"
            />
            {this.state.errors.title && (
              <Form.Text className="text-danger">{this.state.errors.title}</Form.Text>
            )}
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
              {this.state.errors.genreId && (
                <Form.Text className="text-danger">{this.state.errors.genreId}</Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="numberInStock">
              <Form.Label>In Stock</Form.Label>
              <Form.Control
                type="number"
                name="numberInStock"
                value={this.state.movie.numberInStock}
                onChange={this.handleChange}
              />
              {this.state.errors.numberInStock && (
                <Form.Text className="text-danger">{this.state.errors.numberInStock}</Form.Text>
              )}
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="dailyRentalRate">
              <Form.Label>Rate</Form.Label>
              <Form.Control
                name="dailyRentalRate"
                value={this.state.movie.dailyRentalRate}
                onChange={this.handleChange}
                placeholder="Enter daily rental rate"
              />
              {this.state.errors.dailyRentalRate && (
                <Form.Text className="text-danger">{this.state.errors.dailyRentalRate}</Form.Text>
              )}
            </Form.Group>
          </Form.Row>

          <Button type="submit">Save</Button>
        </Form>
      </React.Fragment>
    );
  }

  mapToModelView = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = this.validateForm();
    if (errors) {
      console.log("Errors", errors);
      return;
    } else {
      const movie = this.state.movie;
      saveMovie(movie);
      console.log("Movie saved", movie);
    }

    this.props.history.push("/movies");
  };

  handleChange = (event) => {
    const movie = this.state.movie;
    movie[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ movie });
  };

  validateForm = () => {
    const errors = {};
    const movie = this.state.movie;

    if (movie.title === "") errors.title = "Title is required";
    if (movie.genreId === "") errors.genreId = "Genre is required";

    const numberInStock = movie.numberInStock;
    if (numberInStock === "") errors.numberInStock = "In Stock is required";
    if (!Number.isInteger(numberInStock)) errors.numberInStock = "Must be a number";
    if (numberInStock < 0 || numberInStock > 100) errors.numberInStock = "Must be from 0 to 100";

    const dailyRentalRate = movie.dailyRentalRate;
    if (dailyRentalRate === "") errors.dailyRentalRate = "Rate is required";
    if (Number.isNaN(parseFloat(dailyRentalRate))) errors.dailyRentalRate = "Must be a number";
    if (dailyRentalRate < 0 || dailyRentalRate > 10)
      errors.dailyRentalRate = "Must be from 0 to 10";

    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      return null;
    } else {
      return errors;
    }
  };
}

export default MovieForm;
