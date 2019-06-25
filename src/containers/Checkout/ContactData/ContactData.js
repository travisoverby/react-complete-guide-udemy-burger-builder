import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {

    orderForm: {

      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'The street you live on'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your postal code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 10
        },
        valid: false,
        touched: false
      },

      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'The country you live in'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      email: {
        elementType: 'email',
        elementConfig: {
          type: 'text',
          placeholder: 'Your email address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }

    },
    formIsValid: false,
    loading: false
  };
  
  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required && isValid) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength && isValid) {
      isValid = value.length >= rules.minLength;
    }

    if (rules.maxLength && isValid) {
      isValid = value.length <= rules.maxLength;
    }
  
    return isValid;
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }; 

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })

      .catch(error => {
        this.setState({ loading: false });
      });

  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = updatedOrderForm[inputIdentifier] = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = (updatedOrderForm[inputIdentifier].valid && formIsValid);
    }


    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    let formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
  
    formElements = formElements.map(formElement => {
      return (
        <Input 
          key={formElement.id}
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value} 
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation} 
          touched={formElement.config.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)} />
      );    
    });

    let form = (
      <form>
        {formElements}
        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
