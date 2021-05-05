import { LitElement, html, css, property } from 'lit-element';
import { apolloClient} from './apollo/apollo-client';
import gql from 'graphql-tag';
import {Vehicle} from './types';

export class LionGarage extends LitElement {
  @property({ type: String }) title = 'Lion Garage';
  @property() cars:Array<Vehicle> = [];

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lion-garage-background-color);
    }

    main {
      flex-grow: 1;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  constructor() {
    super();
    let query = gql`
      query {
        allCars {
          model
          make
          licensed
          date_added
        }
      }
    `
    apolloClient.query({query}).then((results) => {
      this.cars = results.data.allCars
        .map((car: { model: string }) => ({
          ...car
        }))
        .sort((a:Vehicle, b: Vehicle) => a.date_added >= b.date_added ? 1 : -1); // we could use Date transformation here but iso format helps comparing the string

      console.log(this.cars);
    });
  }

  render() {
    return html`
      <main>
        <h1>${this.title}</h1>
      </main>
      <h2>list of cars</h2>
      <table>
      ${this.cars.map(car => html`<tr><td>${car.date_added}</td><td>${car.model}</td><td>${car.make}</td><td>
        ${car.licensed ?
          html`<button>show details</button>` : ''}
      </td></tr>`)}
      </table>

      <p class="app-footer">
        Made with love via
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
