import { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, SearchInput, SearchButton } from './SearchBar.styled';
import { BiSearchAlt2 } from 'react-icons/bi';

export function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query.toLowerCase().trim());
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit} values={query}>
        <SearchButton type="submit" className="button">
          <BiSearchAlt2 />
        </SearchButton>

        <SearchInput
          onChange={handleChange}
          value={query}
          type="text"
          // autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
