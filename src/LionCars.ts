import { LitElement, html, css, property, customElement } from 'lit-element';
import { Vehicle } from './types.js';
import '@lion/dialog/define';

@customElement('lion-cars')
export class LionCars extends LitElement {
  @property() cars: Array<Vehicle> = [];

  @property() selectedId: string = '';

  static styles = css`
    td,
    th {
      padding: 0.5rem;
    }

    tr:nth-child(even) {
      background: #f0f0f0; // todo add to the theme?
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
  `;

  setSelectedId(id: string) {
    const selectEvent = new CustomEvent('car-selected', {
      bubbles: true,
      detail: { id },
    });
    this.dispatchEvent(selectEvent);
  }

  render() {
    return html`
      <main>
        <h1>cars</h1>
        ${this.cars?.length
          ? html`<table>
              <tr>
                <th>Year added</th>
                <th>Model</th>
                <th>Make</th>
                <th></th>
              </tr>
              ${this.cars.map(
                car => html` <tr>
                  <td>${car.date_added}</td>
                  <td>${car.model}</td>
                  <td>${car.make}</td>
                  <td>
                    <button
                      @click="${() => this.setSelectedId(car.id)}"
                      ?disabled="${!car.licensed}"
                      aria-label="${car.licensed
                        ? 'show details'
                        : 'details not available'}"
                    >
                      <lion-icon icon-id="lion-garage:misc:file"></lion-icon>
                    </button>
                  </td>
                </tr>`
              )}
            </table>`
          : html`<!-- todo implement progress indicator -->`}
      </main>
    `;
  }
}
