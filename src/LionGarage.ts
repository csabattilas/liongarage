import { LitElement, html, css, property } from 'lit-element';
import { apolloClient} from './apollo/apollo-client';
import gql from 'graphql-tag';

export class LionGarage extends LitElement {
  @property({ type: String }) title = 'Lion Garage';
  @property({ type: String }) cars = 'Lion Garage';

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

    .logo > svg {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
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
        }
      }
    `
    apolloClient.query({query}).then((results) => {
      this.cars = results.data.allCars.map((car: { model: string }) => car.model).join(', ');
    });
  }
r
  render() {
    return html`
      <main>
        <h1>${this.title}</h1>
      </main>

      <h2>list of cars</h2>
      ${this.cars}

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
