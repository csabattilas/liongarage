import { customElement, html, LitElement, property, css } from 'lit-element';
import gql from 'graphql-tag';
import { Vehicle } from './types.js';
import { apolloClient } from './apollo/apollo-client.js';
import '@lion/dialog/define';
import { shoppingCart } from './utils/ShoppingCartService.js';

const query = gql`
  query vehicleQuery($id: ID!) {
    vehicle(id: $id) {
      model
      make
      licensed
      year_model
      price
      location {
        warehouse {
          long
          lat
        }
        location
      }
    }
  }
`;
@customElement('lion-car')
export class LionCar extends LitElement {
  @property() vehicle?: Vehicle;

  @property({
    type: String, //
  })
  id = '';

  static styles = css`
    button {
      background: transparent;
      margin-left: auto;
    }
  `;

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    /* eslint-disable  wc/guard-super-call */
    super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'id':
        if (newValue) {
          this.shadowRoot?.querySelector('button')?.click(); // no need to safeguard fastclick-ing or enter, as the dialog will prevent that so keeping it light without rxjs
          apolloClient
            .query({
              query,
              variables: { id: newValue },
            })
            .then(results => {
              this.vehicle = results.data?.vehicle;
            });
        }
        break;

      default: //
    }
  }

  _closeDialog(e: MouseEvent) {
    const closeEvent = new CustomEvent('close-dialog', { bubbles: true });
    this.dispatchEvent(closeEvent);

    e.target?.dispatchEvent(new Event('close-overlay', { bubbles: true }));
  }

  _addToCart(e: MouseEvent) {
    shoppingCart.addToShoppingCart(this.id);

    const addToCartEvent = new CustomEvent('car-added-to-cart', {
      bubbles: true,
    });
    this.dispatchEvent(addToCartEvent);

    this._closeDialog(e);
  }

  render() {
    return html`
      <lion-dialog .config=${{ placementMode: 'global' }}>
        ${this.id}
        <button
          slot="invoker"
          style="display: none"
        ></button>
        <div slot="content" class="dialog">
          <button
            class="close-button"
            @click=${(e: MouseEvent) => this._closeDialog(e)}
          >
            x
          </button>
          <dl>
            <dt>${this.vehicle?.model}</dd>
            <dd><label>Make:</label> ${this.vehicle?.make}</dd>
            <dd><label>Year:</label> ${this.vehicle?.year_model}</dd>
            <dd><label>Price:</label> ${this.vehicle?.price}</dd>
            <dd><label>Location in warehouse</label> long: ${
              this.vehicle?.location?.warehouse?.long
            }, lat:${
      this.vehicle?.location?.warehouse?.lat
    } <br>&nbsp; &nbsp;at ${this.vehicle?.location?.location}</dd>
          </dl>
          <button
            @click="${(e: MouseEvent) => this._addToCart(e)}"
            class="add-to-cart"
          >
            <lion-icon icon-id="lion-garage:misc:shoppingCart"></lion-icon>
                add to cart
          </button>
        </div>
      </lion-dialog>`;
  }
}
