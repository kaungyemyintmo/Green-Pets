var token = localStorage.getItem("token")
console.log(token);

const nullData = null;

loadPoints(); 

const newButton = document.getElementById('newButton'); 
newButton.addEventListener("click", function() {

  const checkAdminPri = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == 401) {
      $('#noAdminToken').modal('show');
    }

    else {
      window.location.href='createTask.html'; 
    }

  }
  fetchMethod(currentUrl + `/api/jwt/admin`, checkAdminPri, 'GET', data=null, token)
})


// to display task list 
const callbackTask = (responseStatus, responseData) => {

    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const taskList = document.getElementById("taskList");
    responseData.forEach((task) => {
      const displayItem = document.createElement("div");
      displayItem.className =
      "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card text-dark bg-white">
              <div class="card-body">
                  <p class="card-text">
                      task : ${task.title}<br> <br>
                      description : ${task.description}<br> <br>
                      points : ${task.points}
                  </p>
          </div>
  
          <button class="btn btn-success border" onclick="getPoints(${task.task_id})" >Accomplish</button>
          <button class="btn btn-primary border " onclick="deleteTask(${task.task_id})">Delete</button>

          </div>
          `;
        
          taskList.appendChild(displayItem);
          });
  };

  fetchMethod(currentUrl + "/api/tasks", callbackTask);

  const newModal = document.getElementById('newModal'); 

  newModal.innerHTML = `
  <div class="modal fade" id="noAdminToken" tabindex="-1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title text-danger" id="noAdminTitle">You don't have admin privileges.</h5>
    </div>
    <div class="modal-body">
      Please log in again with admin secret code if you are an admin.
    </div>
  </div>
</div>
</div>`

// to delete task 
function deleteTask(num) {
  const callbackDel = (responseStatus, responseData) => {
    console.log(responseStatus); 
    console.log(responseData); 

    if (responseStatus == 401) {
      $('#noAdminToken').modal('show');
    }
    if (responseStatus == 204) {
      location.reload();
    }
}

fetchMethod(currentUrl + `/api/tasks/${num}`, callbackDel, 'DELETE', data=null, token)
}

    
    // to get points for perfroming tasks
  function getPoints(num) {

    if (token == null) {
      $('#tokenModal').modal('show');
    }
    const callbackGetPoints = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == "401" ) {
        $('#tokenModal').modal('show');
      }

      loadPoints();
    }

    fetchMethod(currentUrl+`/api/user/tasks/${num}`, callbackGetPoints, 'GET', nullData, token)

  // call function to add progress whenever a task is performed 
addProgressOnTap(num)

  }

  // adding progress whenever a task is performed 
  function addProgressOnTap(num) {
    const callbackAddProgress = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == "401" ) {
        $('#tokenModal').modal('show');
      }
    }

    // to get current date 
    const date = new Date();

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const completionDate = [year, month, day].join('-');
console.log(completionDate);

    const data = {
      task_id : num,  
      completion_date : completionDate
    }

    fetchMethod(currentUrl+`/api/task_progress`, callbackAddProgress, "POST", data, token);
  }

