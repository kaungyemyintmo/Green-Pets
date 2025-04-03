document.addEventListener("DOMContentLoaded", function () {

  const signupForm = document.getElementById("signupForm");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  const submitButton = document.getElementById("signUpButton"); 

// high level password security 
  function checkStrength() {
    const password = document.getElementById("password").value

    const regex = /\d/g;
    const regAlpha = /[A-Z]/g;
    const regalpha = /[a-z]/g;
    const regchar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g;

    const case1 = regex.test(password);
    const case2 = regAlpha.test(password);
    const case3 = regalpha.test(password);
    const case4 = regchar.test(password);


    const condition = case1 && case2 && case3 && case4;

    if (!condition) {
    return false;
    }
    else {
      return true;
    }

  }

// when user presses submit 
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (
      checkStrength() == false) {
   
      warningCard.classList.remove("d-none");
      warningText.innerText = "Weak Password.";
    }

    else if ( 
      checkStrength() == true) {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;

        const confirmPassword = document.getElementById("confirmPassword").value;
        const password = document.getElementById("password").value
        
      // Perform signup logic
      if (password === confirmPassword) {
        // Passwords match, proceed with signup
        console.log("Signup successful");

        warningCard.classList.add("d-none");

        const data = {
          username: username,
          email: email,
          password: password,
        };

        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 200) {
            // Check if signup was successful

              // Store the token in local storage
              localStorage.setItem("token", responseData.token);
              // Redirect or perform further actions for logged-in user
              window.location.href = "login.html";
          
          } else {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
          }
        };

        // Perform signup request
        fetchMethod(currentUrl + "/api/register", callback, "POST", data);

        // Reset the form fields
        signupForm.reset();
      } else {
        // Passwords do not match, handle error
        warningCard.classList.remove("d-none");
        warningText.innerText = "Passwords do not match";
      }
    }
  });
});