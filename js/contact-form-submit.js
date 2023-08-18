document
  .getElementById("contact-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log(event);

    const formData = new FormData(event.target);
    const formDataJSON = {};

    formData.forEach((value, key) => {
      formDataJSON[key] = value;
    });

    const response = await fetch("/.netlify/functions/contact-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataJSON),
    });

    console.log(response);

    window.location.href = response.url;
  });
