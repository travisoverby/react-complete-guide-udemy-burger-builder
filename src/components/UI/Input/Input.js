import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  const invalidInput = props.invalid && props.shouldValidate && props.touched;

  if (invalidInput) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value} 
        onChange={props.changed} />;
      break;

    case ('textarea'):
      inputElement = <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value} 
        onChange={props.changed} />;
      break;

    case ('select'):
      const options = props.elementConfig.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ));

      inputElement = (
        <select 
          className={inputClasses.join(' ')}
          value={props.value} 
          onChange={props.changed} >
          {options}
        </select>
      );
      break;

    default:
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value} 
        onChange={props.changed} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
