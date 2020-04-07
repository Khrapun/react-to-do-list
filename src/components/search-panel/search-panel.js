import React, { Component } from 'react';

import './search-panel.css'

export default class SearchPannel extends Component {

    state = {
        term: ''
    }

    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchChange(term)
    }

    render() {
        return (<input className="form-control seacrh-input" 
        placeholder='type to search'
        value={this.state.term}
        onChange={this.onSearchChange}/>)
    }
}
