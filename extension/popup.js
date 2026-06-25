document.addEventListener('DOMContentLoaded', async () => {
  const scrapeButton = document.getElementById('scrape-action');
  const statusMsg = document.getElementById('output-message');
  const sourceIndicator = document.getElementById('source-indicator');

  // Query details on current active browser tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (tab && tab.url) {
    const urlObj = new URL(tab.url);
    // Display full link properly now that we use truncation
    sourceIndicator.textContent = tab.url;
    window.logger?.info("Active tab detected:", tab.url);
  }

  scrapeButton.addEventListener('click', async () => {
    if (tab.url && tab.url.startsWith("chrome://")) {
      statusMsg.textContent = "Error: Cannot scrape Chrome internal pages.";
      window.logger?.warn("Attempted to scrape a chrome:// page");
      return;
    }

    statusMsg.textContent = "Extracting target listing DOM data...";
    window.logger?.info("Executing content script...");
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    }, (injectionResults) => {
      if (!injectionResults || !injectionResults[0]) {
        statusMsg.textContent = "Error: Failed parsing page elements.";
        window.logger?.error("Failed parsing page elements. No results.");
        return;
      }
      
      const pagePayload = injectionResults[0].result;
      window.logger?.success("Extracted page payload");
      transmitToBackend(pagePayload);
    });
  });

  async function transmitToBackend(payload) {
    statusMsg.textContent = "Transmitting to Trackd Review Inbox...";
    
    try {
      // Production URL can replace localhost targeting your Go engine route
      const backendEndpoint = 'http://localhost:8080/api/v1/jobs/scrape';
      window.logger?.info(`Transmitting to ${backendEndpoint}...`);
      
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Placeholder implementation: secure JWT integration logic goes here
          'Authorization': 'Bearer MOCK_USER_SESSION_TOKEN'
        },
        body: JSON.stringify({
          sourceType: "extension",
          payload: payload.innerText,
          jobLink: payload.url
        })
      });

      if (response.ok) {
        statusMsg.style.color = "#10B981";
        statusMsg.textContent = "Success! Saved to holding area. Open Web Dashboard to complete approval.";
        window.logger?.success("Successfully transmitted payload!");
      } else {
        const errorText = await response.text();
        statusMsg.style.color = "#EF4444";
        statusMsg.textContent = `Server Error: Received Status ${response.status}, ${response?.statusText}: ${errorText}`;
        window.logger?.error(`Backend returned ${response.status}: ${errorText}`);
      }
    } catch (err) {
      statusMsg.style.color = "#EF4444";
      statusMsg.textContent = "Connection Failure: Check if Go Server is live.";
      window.logger?.error("Connection failure to backend:", err);
    }
  }
});