document.getElementById("questionnaire-form").addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData();
  formData.append("entry.1047060156", document.getElementById("name").value);  // Name field
  formData.append("entry.2101188198", document.getElementById("phone").value); // Phone field
  formData.append("entry.1462208696", document.getElementById("email").value); // Email field

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSfPBsxIecENxdb5i9pPd3J9Yl0Kf2sLadgtcoA63GNw-3e9tw/formResponse", {
    method: "POST",
    body: formData,
    mode: "no-cors"  // Required for Google Forms
  })
    .then(() => {
      alert("Form submitted successfully!");
      document.getElementById("questionnaire-form").reset();
    })
    .catch(() => {
      alert("Failed to submit. Please try again later.");
    });
});
