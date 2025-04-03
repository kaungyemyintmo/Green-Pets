var token = localStorage.getItem("token")
console.log(token);

// to create dynamic modal
function modalDisplay(txt, txt1) {
const taskCreated = document.getElementById("taskCreated"); 
taskCreated.innerHTML =`
<div class="modal fade" id="taskCreatedModal" tabindex="-1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title text-dark" id="taskCreatedTitle">${txt}!</h5>
    </div>
    <div class="modal-body">
     ${txt1} 
    </div>
  </div>
</div>
</div>`;
}

const button = document.getElementById('createButton'); 

    
button.addEventListener('click', () => createNew())

        

function createNew() {
    const title = document.getElementById('title').value; 
    const description = document.getElementById('description').value; 
    const points = document.getElementById('points').value; 
    const taskForm = document.getElementById('taskForm');
    const newTaskCallback = (responseStatus, responseData) => {
        
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

if(responseStatus == 401) {
    $('#tokenModal').modal('show');
}       

else if (description == '' || title == '' || points == '') {
  modalDisplay("Missing data.", "Try again.")
  $('#taskCreatedModal').modal('show');
taskForm.reset();
}

else if (responseStatus == 201) {
  modalDisplay("Success", responseData.message)
    $('#taskCreatedModal').modal('show');
taskForm.reset();
}

else {
  modalDisplay("Error", responseData); 
  $('#taskCreatedModal').modal('show');
  taskForm.reset()
}
    }
    
    const data = { 
        title : title, 
        description : description, 
        points : points
    }
    fetchMethod(currentUrl + "/api/tasks", newTaskCallback, 'POST', data, token);
    }
    