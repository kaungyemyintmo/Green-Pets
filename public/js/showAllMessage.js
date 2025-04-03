

// to authenticate users to edit or delete their messages 
var token = localStorage.getItem("token")
console.log(token);

// before a message is selected to edit
const msgId = document.getElementById("msgId");

msgId.innerHTML = `
<p> Message Id : press 'edit' to select a message </p>`


document.addEventListener("DOMContentLoaded", function () {
// display user messages 
const callbackUserMsg = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);


  if (responseStatus == "401" ) {
    $('#tokenModal').modal('show');
  }

  else {
    const myMessage = document.getElementById("myMessages");
    responseData.forEach((message) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body row">
              <div class = "col-md-6">
                  <p class="card-text">
                      message: ${message.message_text} 
                  </p>
                  </div>
                  <div class = "col-md-2">
                  <button id="editMsgButton" type ="button" class="btn btn-primary" onclick="functionEditMsg(${message.id})">edit</button>
                  </div>
                  <div class = "col-md-3">
                  <button id="delMsgButton" type ="button" class="btn btn-secondary" onclick="functionDelMsg(${message.id})">delete</button>
                  </div>
                  </div>
          </div>`;

      myMessage.appendChild(displayItem);
    });
  }
}

fetchMethod(currentUrl + "/api/message/user" , callbackUserMsg, 'GET', data=null, token);
})

// display global messages 
const callbackGlobalMsg = (responseStatus, responseData) => {

  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const messageList = document.getElementById("messageList");
  responseData.forEach((message) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
    displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <p class="card-text">
                      message: ${message.message_text} <br>
                      user id: ${message.user_id}
                  </p>
              </div>
          </div>
          `;
    messageList.appendChild(displayItem);
  });
};


fetchMethod(currentUrl + "/api/message", callbackGlobalMsg);

// function to edit message 
function functionEditMsg(num) {

  msgId.innerHTML = `<p> Message Id : ${num} </p>`

  const sendDataButton = document.getElementById("editDataButton"); 
  
sendDataButton.addEventListener("click", ()=> {
  const callbackEditMsg = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == "401" ) {
      $('#tokenModal').modal('show');
    }

    if (responseStatus) {
      location.reload();
    }
  }
  const editMsgText = document.getElementById("newMsg").value
  const data = {
    message_text: editMsgText
  }
  fetchMethod(currentUrl + `/api/message/${num}`, callbackEditMsg, 'PUT', data, token);

})
}

// function to delete message 
function functionDelMsg(num) {

  const callbackDelMsg = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == "401" ) {
      $('#tokenModal').modal('show');
    }
  }

  fetchMethod(currentUrl + `/api/message/${num}`, callbackDelMsg, 'DELETE', data=null, token);
  location.reload();
}

// to create new message 
const createButton = document.getElementById("msgButton");
createButton.addEventListener("click", () => createMsg());

// function to create message 
function createMsg() {
  const callbackMsg = (responseStatus, responseData) => {

    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    
    if (responseStatus == "401" ) {
      $('#tokenModal').modal('show');
    }

  }

  const msg = document.getElementById("messageText").value;
  const data = {
    message_text: msg
  }
  fetchMethod(currentUrl + "/api/message", callbackMsg, "POST", data, token);
  location.reload();
}
