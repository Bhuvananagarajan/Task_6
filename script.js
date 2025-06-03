document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const tableBody = document.querySelector("#submittedTable tbody");

  let submissions = JSON.parse(localStorage.getItem("formSubmissions")) || [];
  submissions.forEach((entry, index) => addToTable(entry, index));

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    // Clear errors
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("messageError").textContent = "";
    document.getElementById("successMessage").textContent = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name) {
      document.getElementById("nameError").textContent = "Name is required.";
      isValid = false;
    }

    if (!email || !emailRegex.test(email)) {
      document.getElementById("emailError").textContent = "Enter a valid email.";
      isValid = false;
    }

    if (!phone || !phoneRegex.test(phone)) {
      document.getElementById("phoneError").textContent = "Enter a 10-digit phone number.";
      isValid = false;
    }

    if (!message) {
      document.getElementById("messageError").textContent = "Message is required.";
      isValid = false;
    }

    if (isValid) {
      const entry = { name, email, phone, message };
      submissions.push(entry);
      localStorage.setItem("formSubmissions", JSON.stringify(submissions));
      addToTable(entry, submissions.length - 1);

      document.getElementById("successMessage").textContent = "Submitted Successfully! 🎉";
      form.reset();
    }
  });

  function addToTable(entry, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.phone}</td>
      <td>${entry.message}</td>
      <td><button onclick="deleteEntry(${index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  }

  window.deleteEntry = function(index) {
    submissions.splice(index, 1);
    localStorage.setItem("formSubmissions", JSON.stringify(submissions));
    tableBody.innerHTML = "";
    submissions.forEach((entry, idx) => addToTable(entry, idx));
  };
});
