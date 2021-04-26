/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */
import React from 'react';
import { Label, Panel } from 'react-bootstrap';
import ProductAdd from './productAdd.jsx';
import Toast from './Toast.jsx';

export default class NewProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      toastVisible: false,
      toastMessage: ' ',
      toastType: 'success',
    };
    this.createProduct = this.createProduct.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    document.forms.ProductAdd.price.value = '$';
    this.loadData();
  }

  async loadData() {
    const query = `query{
              productList{
                  id Name Price Image Category
              }
          }`;

    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    this.setState({ products: result.data.productList });
  }

  async createProduct(product) {
    const newProduct = product;
    const query = `mutation {
              productAdd(product:{
                Name: "${newProduct.Name}",
                Price: ${newProduct.Price},
                Image: "${newProduct.Image}",
                Category: ${newProduct.Category},
              }) {
                _id
              }
            }`;
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    this.loadData();
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({
      toastVisible: false,
    });
  }

  render() {
    const { products } = this.state;
    const { toastVisible, toastMessage, toastType } = this.state;
    return (
      <div>
        <h1><Label>Inventory Management System</Label></h1>
        <br />
        <Panel>
          <Panel.Heading>
            <Panel.Title>Add Product</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <ProductAdd createProduct={this.createProduct} />
          </Panel.Body>
          <Toast
            showing={toastVisible}
            onDismiss={this.dismissToast}
            bsStyle={toastType}
          >
            {toastMessage}
          </Toast>
        </Panel>
      </div>
    );
  }
}
