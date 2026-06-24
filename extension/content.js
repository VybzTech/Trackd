(() => {
  // Capture global document information parameters
  const rawBodyText = document.body.innerText;
  const currentUrl = window.location.href;
  const initialTitle = document.title;

  return {
    innerText: rawBodyText,
    url: currentUrl,
    title: initialTitle
  };
})();