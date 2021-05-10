import { icons } from '@lion/icon';

icons.addIconResolver('lion-garage', (iconset: any, name: string) => {
  switch (iconset) {
    case 'misc':
      return import('./iconset-misc').then(
        (module: any) => module.default[name]
      );
    default:
      throw new Error(`Unknown iconset ${iconset}`);
  }
});
