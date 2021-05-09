import {LitElement, html, css, property, customElement} from 'lit-element';
import '@lion/tabs/define';
import './LionCars';
import './LionShoppingCart';
import './LionCar';
import gql from 'graphql-tag';
import {apolloClient} from './apollo/apollo-client';
import {Vehicle} from './types';
import {shoppingCart} from './utils/ShoppingCartService';
import './icons/index';
import '@lion/icon/define';

@customElement('lion-garage')
export class LionGarage extends LitElement {
  @property() allCars?: Vehicle[] = [];
  @property() cartIds: string[] = [];
  @property() selectedCarId = '';
  @property() itemsInCart: number = 0;

  static styles = css`
    [slot="panel"] {
      border-top: 1px solid;
      padding: 1rem;
      height: calc(100vh - 6.5rem);
      overflow: auto;
    }

    [slot="tab"] {
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    a {
      color: var(--base-color);
    }

    .open-wc {
      font-size: var(--caption-font-size);
      margin: 0.5rem;
      text-align: right;
      display: block;
    }

    .badge {
      background-color: #000;
      font-size: var(--caption-font-size);
      color: #fff;
      border-radius: 0.5rem;
      position: relative;
      top: -0.8rem;
      left: -0.5rem;
      padding: 0.1rem;
    }
  `

  constructor() {
    super();
    let query = gql`
      query {
        allCars {
          id
          model
          make
          licensed
          date_added
          price
        }
      }
    `
    apolloClient.query({query}).then((results) => {
      this.allCars = results.data.allCars
        .map((car: { model: string }) => ({
          ...car
        }))
        .sort((a:Vehicle, b: Vehicle) => a.date_added <= b.date_added ? 1 : -1); // we could use Date transformation here but iso format helps comparing the string
    });
  }

  _updateCart() {
    this.cartIds = shoppingCart.getShoppingCartIds();
    this.itemsInCart = shoppingCart.getTotalItems();
  }

  _updateCartItems() {
    this.itemsInCart = shoppingCart.getTotalItems();
  }

  render() {
    this.cartIds = shoppingCart.getShoppingCartIds();
    this.itemsInCart = shoppingCart.getTotalItems();

    return html`
      <lion-car
        id="${this.selectedCarId}"
        @close-dialog="${(e:Event) => {this.selectedCarId = ''}}"
        @car-added-to-cart=${() => this._updateCart()}
      ></lion-car>
      <lion-tabs>
        <a slot="tab" aria-selected="true">
          <lion-icon icon-id="lion-garage:misc:car"></lion-icon>
        </a>
        <lion-cars slot="panel" .cars=${this.allCars} @car-selected="${(e: CustomEvent) => this.selectedCarId = e.detail.id}"></lion-cars></p>
        <a slot="tab">
          <lion-icon icon-id="lion-garage:misc:shoppingCart"></lion-icon>
          <span class="badge">${this.itemsInCart}</span>
        </a>
        <lion-shopping-cart  slot="panel" .cars=${this.allCars} .ids="${this.cartIds}" @car-deleted-from-cart="${() => this._updateCartItems()}"></lion-shopping-cart></p>
      </lion-tabs>
      <p class="open-wc">
          made via
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/open-wc"
          >open-wc</a
          >.
        </p>
    `;
  }
}
