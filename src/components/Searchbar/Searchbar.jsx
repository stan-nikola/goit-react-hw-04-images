import { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, SearchInput, SearchButton } from './Searchbar.styled';
import { BiSearchAlt2 } from 'react-icons/bi';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query.toLowerCase());
    this.setState({ query: '' });
  };

  render() {
    return (
      <Header className="searchbar">
        <Form onSubmit={this.handleSubmit} values={this.state.query}>
          <SearchButton type="submit" className="button">
            <BiSearchAlt2 />
          </SearchButton>

          <SearchInput
            onChange={this.handleChange}
            value={this.state.query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
