# eMAG.ro PreMiD Activity

This is a PreMiD activity for eMAG.ro, Romania's largest online marketplace and e-commerce platform. This activity displays your current browsing activity on eMAG.ro in your Discord status.

## Features

- **Homepage Detection**: Shows when you're browsing the main page
- **Product Viewing**: Displays the product name and price when viewing products
- **Search Results**: Shows your search queries and results
- **Category Browsing**: Displays the category you're exploring
- **Shopping Cart**: Shows cart status and item count
- **Account Management**: Detects when you're managing your account
- **Wishlist/Favorites**: Shows when you're viewing saved products
- **Order History**: Displays when checking your orders
- **Privacy Mode**: Option to hide specific details
- **Customizable Settings**: Toggle buttons, timestamps, and privacy mode

## Files Included

1. **metadata.json** - Contains activity metadata, settings, and configuration
2. **presence.ts** - Main TypeScript file with activity logic
3. **tsconfig.json** - TypeScript configuration for compilationq

## Activity Settings

The activity includes three customizable settings:

- **Show Buttons**: Toggle buttons that link to the current page
- **Show Timestamp**: Toggle the timestamp showing how long you've been browsing
- **Privacy Mode**: Hide specific details and show generic "Browsing eMAG.ro" status

## Supported Pages

The activity detects and handles these eMAG.ro pages:

- **Homepage** (`/`, `/home`)
- **Product pages** (`/pd/`, `/produs/`)
- **Search results** (`/search`, with query parameters)
- **Categories** (`/c/`, `/laptop`, `/telefoane`, etc.)
- **Shopping cart** (`/cart`, `/cos`)
- **Account pages** (`/account`, `/user`, `/profile`, `/cont`)
- **Wishlist** (`/wishlist`, `/favorites`, `/lista-dorinte`)
- **Orders** (`/orders`, `/comenzi`)
- **Help & Support** (`/help`, `/support`, `/ajutor`)
- **Marketplace info** (`/marketplace`)

## Technical Details

### Dependencies

- PreMiD API v1
- TypeScript
- Standard PreMiD presence interface

### Image Assets

The activity uses direct URLs for images:
- Main logo: eMAG.ro official SVG logo
- Category icons: Flaticon.com icons for different activities
- All images are publicly accessible CDN links

### Localization

The activity supports both English and Romanian descriptions in the metadata.

## Troubleshooting

### Activity Not Showing

1. Ensure you have the correct Discord Client ID
2. Check that Developer Mode is enabled in PreMiD (if using dev mode)
3. Verify that the activity is compiled without errors
4. Make sure you're visiting eMAG.ro (not emag.hu or emag.bg)

### Settings Not Working

1. Clear PreMiD cache and restart the extension
2. Check browser console for any JavaScript errors
3. Ensure you're using the latest version of PreMiD

### Build Errors

1. Make sure you have Node.js 18+ and pnpm installed
2. Run `pnpm install` in the Activities repository root
3. Check that all TypeScript syntax is correct

## Contributing

Feel free to improve this activity by:
- Adding support for more page types
- Improving product name extraction
- Adding more detailed status messages
- Enhancing error handling

## License

This PreMiD activity follows the same license as the PreMiD Activities repository (Mozilla Public License 2.0).

## Disclaimer

This activity is not officially affiliated with eMAG.ro. eMAG is a trademark of eMAG S.A.
