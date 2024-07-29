import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSearch} className='search-bar'>
      <Form.Control
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <Button type="submit" className='search-btn'>Search</Button>
    </Form>
  );
};

export default SearchBar;
