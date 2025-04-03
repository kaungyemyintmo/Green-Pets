var token = localStorage.getItem("token")
console.log(token);
document.addEventListener("DOMContentLoaded", function () {
  const callbackTrivia = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const triviaList = document.getElementById("triviaList");
    responseData.forEach((trivia) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title text-center"> Trivia ${trivia.trivia_id}</h5>
                  <div class = "container d-flex justify-content-center">
                  <button id="selectTriviaButton" type ="button" class="btn btn-primary" onclick="takeTrivia(${trivia.trivia_id})">select</button>
              </div>
              </div>
          </div>
          `;
      triviaList.appendChild(displayItem);
    });
  };

  fetchMethod(currentUrl + "/api/user/trivia", callbackTrivia);
});


// to load specific trivia question
function takeTrivia(num) {
  const callbackForTriviaInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
   if (responseStatus == 401) {
      $('#tokenModal').modal('show');
    }

    else{
    let id = responseData[0].trivia_id;
    const triviaInfo = document.getElementById("triviaInfo");


    let newAry = responseData[0].options.split("(OR)");
  var options = ''; 
    for (p in newAry) {
        options +=`<div class = "form-check">
      <input type="radio" name="trivia" value="${newAry[p]}">
      ${newAry[p]} <br> 
    </div>`
    };

    var myButton = `<button type="button" class="btn btn-primary centre" onclick="checkAns(${id})">Submit</button>`;

    triviaInfo.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">
                Trivia ID: ${responseData[0].trivia_id} <br>
                Question : ${responseData[0].question} <br> 
                </p>
                ${options}
                ${myButton}
            </div>
        </div>
    `;
  }
}
  fetchMethod(currentUrl + `/api/user/trivia/${num}`, callbackForTriviaInfo, 'GET', data=null, token);
  options ='';
};

// to check trivia answer
function checkAns(num) {

  var choice = document.querySelector('input[name="trivia"]:checked');
  const regex = /\d+/

  if (choice == null) {
    alert('ERROR! Select an answer')
  }
  if (choice.value) {

    let choice1 = choice.value.match(regex);

    const answerTriviaCallback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == "401") {
        $('#tokenModal').modal('show');
      }

      if(responseStatus == 200) {
          $('#correctModal').modal('show');
          loadPoints()
      }

      if(responseStatus == 406 ) {
        $('#wrongModal').modal('show');
      }
    }

    fetchMethod(currentUrl + `/api/user/trivia/${num}/${choice1}`, answerTriviaCallback, "PUT", data = null, token);
  }
}
