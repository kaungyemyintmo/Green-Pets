
document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {

    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == 200) {
      // Check if login was successful
      if (responseData.token && responseData.user_id) {
        // Store the token and user id in local storage
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user_id", responseData.user_id);

        // Redirect or perform further actions for logged-in user
        window.location.href = "profile.html";
      }
    } else {
      warningCard.classList.remove("d-none");
      warningText.innerText = responseData.message;
    }
  };

  const loginForm = document.getElementById("loginForm");

  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  const option1 = document.getElementById("option1");
  option1.addEventListener("click", function () {
    const displaySpecialCode = document.getElementById("codeInput");
    displaySpecialCode.classList.remove("d-none");
  })

  const option2 = document.getElementById("option2");
  option2.addEventListener("click", function () {
    const displaySpecialCode = document.getElementById("codeInput");
    displaySpecialCode.classList.add('d-none');
  })

  const button = document.getElementById('submitButton');

  button.addEventListener("click", function (event) {

    event.preventDefault();


    const choice = document.querySelector('input[name="adminCheck"]:checked');

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (choice.value == 'yes') {
      const code = document.getElementById("code").value;
      const data = {
        username: username,
        password: password,
        special_code: code
      };
      // Perform login request
      fetchMethod(currentUrl + "/api/login/admin", callback, "POST", data);
    }

    else {
      const data = {
        username: username,
        password: password,
      };
      // Perform login request
      fetchMethod(currentUrl + "/api/login", callback, "POST", data);
    }
    // Reset the form fields
    loginForm.reset();
  });
});