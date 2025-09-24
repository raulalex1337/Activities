const presence = new Presence({
  clientId: '1420151297147015238'
});

enum ActivityAssets {
  Logo = 'https://s13emagst.akamaized.net/assets/ro/css/icons/logo-square.png',
  Cart = 'https://cdn1.iconfinder.com/data/icons/shopping-and-commerce-filled/512/Shopping_and_Commerce_-_filled_75-512.png',
  Search = 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/245532/58-512.png',
  Product = 'https://cdn3.iconfinder.com/data/icons/glypho-design/64/eye-circle-512.png',
  Category = 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-line-shapes/3/05-512.png',
  Account = 'https://cdn1.iconfinder.com/data/icons/ui-next-2020-shopping-and-e-commerce-1/12/75_user-circle-512.png'
}

const browsingTimestamp = Math.floor(Date.now() / 1000);
let lastUrl = '';

presence.on('UpdateData', async () => {
  const { pathname, hostname, href, search } = document.location;

  // Use any to be flexible with properties
  const presenceData: any = {
    largeImageKey: ActivityAssets.Logo,
    largeImageText: 'eMAG.ro - Căutarea nu se oprește niciodată',
    startTimestamp: browsingTimestamp
  };

  const showButtons = await presence.getSetting<boolean>('showButtons') ?? true;
  const showTimestamp = await presence.getSetting<boolean>('showTimestamp') ?? true;
  const privacyMode = await presence.getSetting<boolean>('privacyMode') ?? false;

  if (!showTimestamp) {
    delete presenceData.startTimestamp;
  }

  if (privacyMode) {
    presenceData.details = 'Browsing eMAG.ro';
    presenceData.state = 'Privacy Mode Enabled';
    presenceData.smallImageKey = ActivityAssets.Logo;
    presenceData.smallImageText = 'Private browsing';
  } else {
    const title = document.title;
    const pageTitle = title.replace(' - eMAG.ro', '').replace(' | eMAG.ro', '');

    if (pathname === '/' || pathname === '/home') {
      presenceData.details = 'Browsing Homepage';
      presenceData.state = 'Exploring deals and offers';
      presenceData.smallImageKey = ActivityAssets.Logo;
      presenceData.smallImageText = 'Homepage';
      if (showButtons) {
        presenceData.buttons = [{
          label: 'Visit eMAG.ro',
          url: 'https://emag.ro'
        }];
      }
    } else if (pathname.includes('/pd/') || pathname.includes('/produs/')) {
      const productName = document.querySelector('h1.page-title, .product-title, h1')?.textContent?.trim() || 'Product';
      const price = document.querySelector('.product-new-price, .price, .product-price')?.textContent?.trim();

      presenceData.details = `Viewing: ${productName.length > 50 ? productName.substring(0, 50) + '...' : productName}`;
      presenceData.state = price ? `Price: ${price}` : 'Checking product details';
      presenceData.smallImageKey = ActivityAssets.Product;
      presenceData.smallImageText = 'Viewing Product';

      if (showButtons) {
        presenceData.buttons = [
          { label: 'View Product', url: href },
          { label: 'Visit eMAG.ro', url: 'https://emag.ro' }
        ];
      }
    } else if (pathname.includes('/search') || search.includes('q=') || pathname.includes('/cauți')) {
      const searchQuery = new URLSearchParams(search).get('q') ||
                         document.querySelector('input[name="q"], .search-input')?.getAttribute('value') ||
                         'products';

      presenceData.details = `Searching for: ${searchQuery}`;
      presenceData.state = 'Browsing search results';
      presenceData.smallImageKey = ActivityAssets.Search;
      presenceData.smallImageText = 'Searching';

      if (showButtons) {
        presenceData.buttons = [{
          label: 'View Results',
          url: href
        }];
      }
    } else if (pathname.includes('/c/') ||
               pathname.includes('/laptop') ||
               pathname.includes('/telefoane') ||
               pathname.includes('/tv-audio-video') ||
               pathname.includes('/electrocasnice') ||
               pathname.includes('/gaming') ||
               pathname.includes('/fashion') ||
               pathname.includes('/casa-gradina') ||
               pathname.includes('/auto-moto')) {
      const categoryName = document.querySelector('h1, .page-title, .category-title')?.textContent?.trim() ||
                           pageTitle || 'Category';

      presenceData.details = `Browsing: ${categoryName}`;
      presenceData.state = 'Looking at products';
      presenceData.smallImageKey = ActivityAssets.Category;
      presenceData.smallImageText = 'Category';

      if (showButtons) {
        presenceData.buttons = [{
          label: 'View Category',
          url: href
        }];
      }
    } else if (pathname.includes('/cart') || pathname.includes('/cos')) {
      const itemCount = document.querySelectorAll('.cart-widget.cart-line').length;

      presenceData.details = 'Shopping Cart';
      presenceData.state = itemCount > 0 ? `${itemCount} item${itemCount > 1 ? 's' : ''} in cart` : 'Cart is empty';
      presenceData.smallImageKey = ActivityAssets.Cart;
      presenceData.smallImageText = 'Shopping Cart';
    } else if (pathname.includes('/account') || pathname.includes('/user') || pathname.includes('/profile') || pathname.includes('/cont')) {
      presenceData.details = 'Account Management';
      presenceData.state = 'Managing account settings';
      presenceData.smallImageKey = ActivityAssets.Account;
      presenceData.smallImageText = 'Account';
    } else if (pathname.includes('/wishlist') || pathname.includes('/favorites') || pathname.includes('/favorite') || pathname.includes('/lista-dorinte')) {
      presenceData.details = 'Wishlist';
      presenceData.state = 'Viewing saved products';
      presenceData.smallImageKey = ActivityAssets.Product;
      presenceData.smallImageText = 'Wishlist';
    } else if (pathname.includes('/orders') || pathname.includes('/comenzi')) {
      presenceData.details = 'Order History';
      presenceData.state = 'Checking orders';
      presenceData.smallImageKey = ActivityAssets.Account;
      presenceData.smallImageText = 'Orders';
    } else if (pathname.includes('/help') || pathname.includes('/support') || pathname.includes('/ajutor')) {
      presenceData.details = 'Help & Support';
      presenceData.state = 'Getting assistance';
      presenceData.smallImageKey = ActivityAssets.Logo;
      presenceData.smallImageText = 'Support';
    } else if (pathname.includes('/marketplace')) {
      presenceData.details = 'eMAG Marketplace';
      presenceData.state = 'Learning about selling';
      presenceData.smallImageKey = ActivityAssets.Logo;
      presenceData.smallImageText = 'Marketplace';
    } else {
      const cleanTitle = pageTitle || 'Browsing';
      presenceData.details = `Browsing: ${cleanTitle.length > 50 ? cleanTitle.substring(0, 50) + '...' : cleanTitle}`;
      presenceData.state = 'Exploring eMAG.ro';
      presenceData.smallImageKey = ActivityAssets.Logo;
      presenceData.smallImageText = 'Browsing';

      if (showButtons) {
        presenceData.buttons = [{
          label: 'Visit Page',
          url: href
        }];
      }
    }
  }

  if (presenceData.details) {
    presence.setActivity(presenceData);
  } else {
    presence.clearActivity();
  }

  lastUrl = href;
});
