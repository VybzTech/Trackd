document.addEventListener('DOMContentLoaded', async () => {
  const scrapeButton = document.getElementById('scrape-action');
  const statusMsg = document.getElementById('output-message');
  const sourceIndicator = document.getElementById('source-indicator');

  // Query details on current active browser tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (tab && tab.url) {
    const urlObj = new URL(tab.url);
    sourceIndicator.textContent = urlObj.hostname.replace('www.', '');
  }

  scrapeButton.addEventListener('click', async () => {
    statusMsg.textContent = "Extracting target listing DOM data...";
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    }, (injectionResults) => {
      if (!injectionResults || !injectionResults[0]) {
        statusMsg.textContent = "Error: Failed parsing page elements.";
        return;
      }
      
      const pagePayload = injectionResults[0].result;
      transmitToBackend(pagePayload);
    });
  });

  async function transmitToBackend(payload) {
    statusMsg.textContent = "Transmitting to Trackd Review Inbox...";
    
    try {
      // Production URL can replace localhost targeting your Go engine route
      const backendEndpoint = 'http://localhost:8080/api/v1/applications/parse';
      
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
      } else {
        statusMsg.style.color = "#EF4444";
        statusMsg.textContent = `Server Error: Received Status ${response.status}`;
      }
    } catch (err) {
      statusMsg.style.color = "#EF4444";
      statusMsg.textContent = "Connection Failure: Check if Go Server is live.";
    }
  }
});