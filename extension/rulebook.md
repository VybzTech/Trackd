# Extension Rulebook

## General Principles
- Keep the extension lightweight and secure.
- Use Manifest V3 standard practices.

## UI/UX
- Use modern typography (Google Fonts) and maintain a premium dark-mode aesthetic.
- Interactive elements should have dynamic visual feedback (e.g., 3D button press effects).

## Communication
- Content scripts extract data and send to popup or background script.
- The popup handles API communication to the Go backend.

## Logging
- Use the custom `logger.js` to standardize console outputs (`info`, `warn`, `error`, `success`).
- **Debugging Tip**: Because the extension popup closes automatically when you click outside of it (which also clears its console), you MUST right-click the popup and select "Inspect" to open the Developer Tools. Keep this window open while interacting with the extension to see the logs (`window.logger`) fire in real-time.
