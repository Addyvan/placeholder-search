import React from "react";
import PropTypes from "prop-types";

import BilingualSearchObject from "./BilingualSearchObject";
import SearchBar from "./SearchBar";

class Search extends React.Component {
  constructor(props) {
    super(props);

    var searchObj = new BilingualSearchObject(
      props.data, 
      props.englishKey, 
      props.frenchKey, 
      props.outputKey
    );

    this.state = {
      searchIndexEN: searchObj.searchIndexEN,
      searchIndexFR: searchObj.searchIndexFR,
      searchReturnValuesEN: searchObj.searchReturnValuesEN,
      searchReturnValuesFR: searchObj.searchReturnValuesFR
    }

  }


  render() {
    console.log(this.state);
    return(
      <>{
        (this.props.lang === "en") ?
          <SearchBar 
            placeholder={this.props.placeholder}
            section="desktop"
            searchIndex={this.state.searchIndexEN}
            searchReturnValues={this.state.searchReturnValuesEN}
          />
          :
          <SearchBar 
            placeholder={this.props.placeholder}
            section="desktop"
            searchIndex={this.state.searchIndexFR}
            searchReturnValues={this.state.searchReturnValuesFR}
          />
      }</>
    );
  }
}

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  englishKey: PropTypes.string.isRequired,
  frenchKey: PropTypes.string.isRequired
};

export default Search;