import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  }
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }))
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => option !== optionToRemove)
    }))
  };
  handlePick = () => {
    const randomIndex = Math.floor((Math.random() * this.state.options.length));
    const option = this.state.options[randomIndex];
    this.setState(() => ({ selectedOption: option }));

  };
  handleCloseOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter vaild value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }
    this.setState((prevState) => ({ options: prevState.options.concat([option]) }))
  };
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) { }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  render() {
    return (
      <div>
        <Header
          title='Indecision App'
          subtitle='Put your life in hands of a computer'
        />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
          <OptionModal
            selectedOption={this.state.selectedOption}
            handleCloseOption={this.handleCloseOption}
          />
        </div>
      </div>
    );
  }
}

export default IndecisionApp;