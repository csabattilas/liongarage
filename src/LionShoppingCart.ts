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

  @property() ids: string[] = [];

  @property() shoppingCartCars: Array<Vehicle> = [];

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

    td:first-child {
      width: 50px;
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

    input[type='number'] {
      width: 50px;
      text-align: right;
      border: 1px solid var(--button-border-color);
    }
  `;

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    if (changedProperties.get('ids')) {
      this.shoppingCartCars = this.cars.filter((car: Vehicle) =>
        this.ids.includes(car.id)
      );
      this.total = this.shoppingCartCars
        .reduce((acc, car) => acc.plus(car.price), new Big(0))
        .toNumber();
    }
  }

  _updateCount(e: Event, id: string) {
    const { value } = e.currentTarget as HTMLInputElement;
    if (Number(value) < 0 || value.indexOf('-') > -1 || !value) {
      (e.currentTarget as HTMLInputElement).value = '0';
    } else {
      shoppingCart.updateCount(id, +value);
      this.dispatchEvent(this._updateEvent);
    }
  }

  _checkZeroCountForId(e: Event, id: string) {
    const { value } = e.currentTarget as HTMLInputElement;

    if (Number(value) === 0 || value.indexOf('-') > -1 || !value) {
      this._delete(id);
    }
  }

  _getItemInCart = (id: string) => shoppingCart.getCartItems(id); // not sure about this performance todo check

  _delete(id: string) {
    shoppingCart.deleteItemFromShoppingCart(id);
    this.ids = shoppingCart.getShoppingCartIds();

    this.dispatchEvent(this._updateEvent);
  }

  render() {
    return html`
      <main>
        <h1>Shopping cart</h1>
        ${this.shoppingCartCars?.length
          ? html`<table>
                <tr>
                  <th>Count</th>
                  <th>Model</th>
                  <th>Make</th>
                  <th>Price</th>
                  <th></th>
                </tr>
                ${this.shoppingCartCars.map(
                  car => html` <tr>
                    <td>
                      <input
                        type="number"
                        .value="${this._getItemInCart(car.id)}"
                        @change="${(e: Event) => this._updateCount(e, car.id)}"
                        @blur="${(e: Event) =>
                          this._checkZeroCountForId(e, car.id)}"
                      />
                    </td>
                    <td>${car.model}</td>
                    <td>${car.make}</td>
                    <td class="price">${car.price}</td>
                    <td>
                      <button @click="${() => this._delete(car.id)}">
                        <lion-icon icon-id="lion-garage:misc:bin"></lion-icon>
                      </button>
                    </td>
                  </tr>`
                )}
                <tr>
                  <td colspan="3" class="price">Total:</td>
                  <td class="price"><strong>${this.total}</strong></td>
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
