/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/jsx-no-undef": "off" */
import React from 'react';
import { Label, Panel } from 'react-bootstrap';
import ProductTable from './productTable.jsx';
import ProductAdd from './productAdd.jsx';
import Toast from './Toast.jsx';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      toastVisible: false,
      toastMessage: ' ',
      toastType: 'success',
    };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
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

  async deleteProduct(id) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;

    const variables = { id };
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    this.showSuccess('Success! Product Deleted!!');
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
        <h1 title="Heading"><Label>Inventory Management System</Label></h1>
        <br />
        <Panel title="Producct List Panel">
          <Panel.Heading>
            <Panel.Title toggle><u>Products List</u></Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ProductTable products={products} deleteProduct={this.deleteProduct} />
          </Panel.Body>
        </Panel>
        <Panel title="Add Product Panel">
          <Panel.Heading>
            <Panel.Title toggle><u>Add Product</u></Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
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
