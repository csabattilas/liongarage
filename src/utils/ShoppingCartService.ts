class ShoppingCartService {
  static sKey = 'shoppingCart'

  get shoppingCart(): {[key: string]: number} {
    const shoppingCartCarIdsJSON = localStorage.getItem(ShoppingCartService.sKey)
    let shoppingCart = {};

    if(shoppingCartCarIdsJSON) {
      shoppingCart = JSON.parse(shoppingCartCarIdsJSON);
    }

    return shoppingCart;
  }

  getShoppingCartIds() {
    return Object.keys(this.shoppingCart);
  }

  getCartItems(id: string) {
    return this.shoppingCart[id];
  }

  deleteItemFromShoppingCart(id: string) {
    const shoppingCart = this.shoppingCart;
    delete shoppingCart[id];

    localStorage.setItem(ShoppingCartService.sKey, JSON.stringify(shoppingCart));
  }

  addToShoppingCart(id: string) {
    const shoppingCart = this.shoppingCart;

    shoppingCart[id] = shoppingCart[id] ? shoppingCart[id] + 1 : 1;
    localStorage.setItem(ShoppingCartService.sKey, JSON.stringify(shoppingCart));
  }

  getTotalItems() {
    return Object.keys(this.shoppingCart).reduce((acc, item) => {
        return acc + this.shoppingCart[item];
      }
    , 0);
  }

  updateCount(id: string, value: number) {
    const shoppingCart = this.shoppingCart;

    shoppingCart[id] = value;
    localStorage.setItem(ShoppingCartService.sKey, JSON.stringify(shoppingCart));
  }
}

export const shoppingCart = new ShoppingCartService();
