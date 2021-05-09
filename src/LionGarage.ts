import {LitElement, html, css, property, customElement, PropertyValues} from 'lit-element';
import '@lion/tabs/define';
import './LionCars';
import './LionShoppingCart';
import './LionCar';
import gql from 'graphql-tag';
import {apolloClient} from './apollo/apollo-client';
import {VehicleSummary} from './types';
import {shoppingCart} from './utils/ShoppingCartService';
import './icons/index';
import '@lion/icon/define';
import {LionTabs} from '@lion/tabs';

@customElement('lion-garage')
export class LionGarage extends LitElement {
  @property() vehicles?: VehicleSummary[] = [];
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
      position: relative;
    }

    [slot="tab"][selected="true"] {
      background-color: #eee;
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
      position: absolute;
      display: block;
      padding: 0.1rem;
      min-width: 14px;
      text-align: center;
      top: 3px;
      right: 5px;
    }
  `

  constructor() {
    super();
    let query = gql`
      query {
        allVehicles {
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
      this.vehicles = results.data.allVehicles
        .map((car: { model: string }) => ({
          ...car
        }))
        .sort((a:VehicleSummary, b: VehicleSummary) => a.date_added <= b.date_added ? 1 : -1); // we could use Date transformation here but iso format helps comparing the string
    });
  }

  _updateCart() {
    this.cartIds = shoppingCart.getShoppingCartIds();
    this.itemsInCart = shoppingCart.getTotalItems();
  }

  _updateCartItems() {
    this.itemsInCart = shoppingCart.getTotalItems();
  }

  _selectedTabChanged() {
    const selectedTab = (this.shadowRoot?.querySelector('lion-tabs') as LionTabs).__selectedIndex;

    window.location.hash = selectedTab + '';
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    const lionTabs = (this.shadowRoot?.querySelector('lion-tabs') as LionTabs)

    if(lionTabs && window.location.hash) {
      lionTabs.__selectedIndex = +window.location.hash.replace('#','');
    } else if(lionTabs) {
      this._selectedTabChanged();
    }
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
      <lion-tabs @selected-changed="${(e: Event) => this._selectedTabChanged()}}">
        <a slot="tab" aria-selected="true">
          <lion-icon icon-id="lion-garage:misc:car"></lion-icon>
        </a>
        <lion-cars
          slot="panel"
          .cars=${this.vehicles}
          @car-selected="${(e: CustomEvent) => this.selectedCarId = e.detail.id}"
        ></lion-cars></p>
        <a slot="tab">
          <lion-icon icon-id="lion-garage:misc:shoppingCart"></lion-icon>
          <span class="badge">${this.itemsInCart}</span>
        </a>
        <lion-shopping-cart
          slot="panel"
          .cars=${this.vehicles}
          .ids="${this.cartIds}"
          @update-cart="${() => this._updateCartItems()}"
        ></lion-shopping-cart></p>
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
