import {customElement, html, LitElement, property, css} from 'lit-element';
import {Vehicle} from './types';
import gql from 'graphql-tag';
import {apolloClient} from './apollo/apollo-client';
import '@lion/dialog/define';
import {shoppingCart} from './utils/ShoppingCartService';

const query = gql`
    query vehicleQuery($id: ID!){
      vehicle(id: $id){
        model
        make
        licensed
        year_model
        price
      }
    }
  `
@customElement('lion-car')
export class LionCar extends LitElement {
  @property() vehicle?: Vehicle;

  @property({
    type: String, //
  }) id = '';

  static styles = css`
    button {
      background: transparent;
      margin-left: auto;
    }
  `

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
     case 'id':  if (newValue) {
        this.shadowRoot?.querySelector('button')?.click(); // no need to safeguard fastclick-ing or enter, as the dialog will prevent that so keeping it light without rxjs
        apolloClient.query({
          query, variables: {id: newValue}
        }).then((results) => {
          this.vehicle = results.data?.vehicle;
        });
      }
    }
  }

  _closeDialog(e:MouseEvent) {
    const closeEvent = new CustomEvent('close-dialog', {bubbles: true});
    this.dispatchEvent(closeEvent);

    e.target?.dispatchEvent(new Event('close-overlay', { bubbles: true }))
  }

  _addToCart() {
    shoppingCart.addToShoppingCart(this.id);

    const addToCartEvent = new CustomEvent('car-added-to-cart', {bubbles: true});
    this.dispatchEvent(addToCartEvent);
  }

  render() {
    return html`
      <lion-dialog .config=${{ placementMode: 'global' }}>
        ${this.id}
        <button slot="invoker" style="display: none"></button>
        <div slot="content" class="dialog">
          <button
            class="close-button"
            @click=${(e:MouseEvent) => this._closeDialog(e)}
          >
            x
          </button>
          <dl>
            <dt>${this.vehicle?.model}</dd>
            <dd><label>Make:</label> ${this.vehicle?.make}</dt>
            <dd><label>Year:</label> ${this.vehicle?.year_model}</dt>
            <dd><label>Price:</label> ${this.vehicle?.price}</dt>
          </dl>
          <button
            @click="${() => this._addToCart()}"
            class="add-to-cart"
          >
            <lion-icon icon-id="lion-garage:misc:shoppingCart"></lion-icon>
                add to cart
          </button>
        </div>
      </lion-dialog>`
  }
}
