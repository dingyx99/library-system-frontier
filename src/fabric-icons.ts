  // Your use of the content in the files referenced here is subject to the terms of the license at https://aka.ms/fabric-assets-license

// tslint:disable:max-line-length

import {
  IIconOptions,
  IIconSubset,
  registerIcons
} from '@uifabric/styling';

export function initializeIcons(
  baseUrl: string = '',
  options?: IIconOptions
): void {
  const subset: IIconSubset = {
    style: {
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontStyle: 'normal',
      fontWeight: 'normal',
      speak: 'none'
    },
    fontFace: {
      fontFamily: `"FabricMDL2Icons"`,
      src: `url('${baseUrl}fabric-icons-935ebe02.woff') format('woff')`
    },
    icons: {
      'Mail': '\uE715',
      'Filter': '\uE71C',
      'Search': '\uE721',
      'FavoriteList': '\uE728',
      'FavoriteStar': '\uE734',
      'FavoriteStarFill': '\uE735',
      'CheckMark': '\uE73E',
      'Contact': '\uE77B',
      'Go': '\uE8AD',
      'Unfavorite': '\uE8D9',
      'CellPhone': '\uE8EA',
      'SingleBookmark': '\uEDFF',
      'SingleBookmarkSolid': '\uEE00',
      'AddFavorite': '\uF0C8',
      'MailUndelivered': '\uF415',
      'MailTentative': '\uF416',
      'AddBookmark': '\uF5B7',
      'PasswordField': '\uF6AA'
    }
  };

  registerIcons(subset, options);
}
