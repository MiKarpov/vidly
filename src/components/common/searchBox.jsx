import React from "react";
import { Form } from "react-bootstrap";

const SearchBox = ({ searchQuery, onChange }) => {
  return (
    <Form.Control
      name="searchQuery"
      value={searchQuery}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="Search..."
    />
  );
};

export default SearchBox;
