
/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */
import React from 'react';
import { Label, Panel } from 'react-bootstrap';
import ProductAdd from './productAdd.jsx';
import Toast from './Toast.jsx';

export default class ProductHome extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      toastVisible: false,
      toastMessage: ' ',
      toastType: 'success',
    };
  }

  render() {
    const { products } = this.state;
    const { toastVisible, toastMessage, toastType } = this.state;
    return (
      <div>
        <h1><Label>Inventory Management System</Label></h1>
        <br />
        <h2>Welcome to Inventory Management System...</h2>
        <br />
        <h4>This is an Inventory management System.</h4>

        <h4>In this system, you can manage the inventory by adding, deleting, updating products.</h4>
        <h4>You can also view the Product List in this system. You can browse various options through navigation menu to view/add product.</h4>
        <h4>Thank you for visiting!!</h4>


      </div>
    );
  }
}
