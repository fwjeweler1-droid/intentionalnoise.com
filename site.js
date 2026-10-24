"use strict";
// Preserve links to sections of the former single-page site.
if (location.pathname.endsWith("/") || location.pathname.endsWith("/index.html")) {
  const legacy = {"#about":"about.html", "#music":"music.html", "#merch":"merch.html", "#connect":"about.html#connect", "#contact":"contact.html#contact"};
  if (legacy[location.hash]) location.replace(legacy[location.hash]);
}
const contact = document.getElementById("contact-form");
if (contact) {
  const endpoint = contact.dataset.contactEndpoint || "";
  const status = document.getElementById("contact-status");
  if (/^https:\/\/formsubmit\.co\/[a-f0-9]{32,64}$/.test(endpoint)) {
    contact.action = endpoint;
    contact.querySelector("fieldset").disabled = false;
    status.textContent = "Send us a private message using the form below.";
    contact.addEventListener("submit", event => {
      if (contact.elements._honey.value) {
        event.preventDefault();
        return;
      }
      status.textContent = "Sending your message…";
    });
  } else {
    contact.querySelector("fieldset").disabled = true;
    contact.addEventListener("submit", event => event.preventDefault());
  }
}

if (location.pathname.endsWith("/about.html") && location.hash === "#contact") location.replace("contact.html#contact");
