import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import "./search.css"
const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <TextField
      label="Search"
      //variant="filled"
      size="small"
      value={searchText}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}

      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={handleSearch} edge="start">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      className='search-ecommerce'
      
    />
  );
};

export default SearchBar;
