import {
  LitElement,
  html,
  css,
  property,
  customElement,
  PropertyValues,
} from 'lit-element';
import '@lion/dialog/define';
import { Big } from 'big.js';
import './LionCar.js';
import { shoppingCart } from './utils/ShoppingCartService.js';
import { Vehicle } from './types.js';

@customElement('lion-shopping-cart')
export class LionCars extends LitElement {
  @property() cars: Array<Vehicle> = [];

  @property() total?: number;

  _updateEvent = new CustomEvent('update-cart', { bubbles: true });

  static styles = css`
    td,
    th {
      padding: 0.5rem;
    }

    tr:nth-child(even) td {
      background: #f0f0f0; // todo add to the theme?
    }

    tr:last-child td {
      background: #fff;
    }

    tr:last-child td {
      border-top: 3px solid;
    }

    th {
      border-bottom: 1px solid;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    h1 {
      margin: 0 0 0.5rem 0;
    }

    td:last-child,
    td:first-child {
      text-align: center;
    }

    td button {
      border: none;
      line-height: 1rem;
      font-size: var(--body-font-size);
      background: transparent;
      padding: 0.3rem;
    }

    td button:not([disabled]) {
      cursor: pointer;
    }

    td button[disabled] {
      opacity: 0.5;
    }

    .price,
    td:first-child.price {
      text-align: right;
    }

    button.continue-to-checkout {
      background: transparent;
      border: 1px solid var(--button-border-color);
      font-size: var(--body-font-size);
      padding: 1rem;
      cursor: pointer;
      display: block;
      margin: 2rem auto;
    }

    button.continue-to-checkout:active {
      background: #eee;
    }
  `;

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    if (changedProperties.get('cars')) {
      this.total = this.cars
        .reduce((acc, car) => acc.plus(car.price), new Big(0))
        .toNumber();
    }
  }

  _getItemInCart = (id: string) => shoppingCart.getCartItems(id); // not sure about this performance todo check

  _delete(id: string) {
    shoppingCart.deleteItemFromShoppingCart(id);
    this.dispatchEvent(this._updateEvent);
  }

  render() {
    return html`
      <main>
        <h1>Shopping cart</h1>
        ${this.cars?.length
          ? html`<table>
                <tr>
                  <th>Model</th>
                  <th>Make</th>
                  <th>Price</th>
                  <th></th>
                </tr>
                ${this.cars.map(
                  car => html` <tr>
                    <td>${car.model}</td>
                    <td>${car.make}</td>
                    <td class="price">${car.price.toLocaleString()}</td>
                    <td>
                      <button @click="${() => this._delete(car.id)}">
                        <lion-icon icon-id="lion-garage:misc:bin"></lion-icon>
                      </button>
                    </td>
                  </tr>`
                )}
                <tr>
                  <td colspan="2" class="price">Total:</td>
                  <td class="price">
                    <strong>${this.total?.toLocaleString()}</strong>
                  </td>
                  <td></td>
                </tr>
              </table>
              <button
                @click=${() => alert('to be continued to checkout ...')}
                class="continue-to-checkout"
              >
                Continue to Checkout
              </button>`
          : html`<p>Your cart is empty</p>`}
      </main>
    `;
  }
}
