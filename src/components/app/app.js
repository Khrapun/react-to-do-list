import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import SearchPannel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter'
import AddItem from '../add-item/add-item'

import './app.css'

export default class App extends Component {

  maxId = 100

  state = {
    todoData: [
      {label: 'Drink Coffe', important: 'false', id: '1'},
      {label: 'Create Awesome App', important: 'true', id: '2'},
      {label: 'Have a lunch', important: 'false', id: '3'}
    ],
    term: '',
    filter: 'all' 
  };

  toggleProperty(array, id, propName) {

      const idx = array.findIndex((el) => el.id === id );

      const oldItem = array[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      
      return [...array.slice(0, idx),  newItem, ...array.slice(idx+1)];
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {

      const idx = todoData.findIndex((el) => el.id === id )

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx+1)];

      return {
        todoData: newArray
      }

    });
  };

  onAddItem = (text) => {
    this.maxId+=1
    this.setState(({ todoData }) => {
      const newItem = [
          {label: text, important: 'false', id: this.maxId+''}
      ];
      
      const newArray = [...todoData.slice(), ...newItem];

      return {
        todoData: newArray
      }

    });
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  };

  onToggleDone = (id) => {

    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  };

  search (items, term) {
    if(term.length===0) {
      return items
    }

    return items.filter((item)=> {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onSearchChange = (term) => {
    this.setState({term})
  }

  filter = (items, filter) => {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default: 
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({filter})
  }

  render () {

    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;

    const toDoCount = todoData.length-doneCount

    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPannel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter filter={filter}
          onFilterChange={this.onFilterChange}/>
        </div>
        <TodoList todos = { visibleItems }
        onDeleted={ this.deleteItem }
        onToggleImportant={ this.onToggleImportant }
        onToggleDone={ this.onToggleDone }/>
        <AddItem onAddItem={ this.onAddItem }/>
      </div>
    );
  };

};