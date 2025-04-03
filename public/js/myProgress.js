var token = localStorage.getItem("token")
console.log(token);

// call the functions 
loadPoints();
showMyProgress();
createNew();
edit();

function showMyProgress() {
    const callbackMyProgressList = (responseStatus, responseData) => {
      
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
    
      const myProgressList = document.getElementById("myProgressList");
      responseData.forEach((progress) => {
        const displayProgress = document.createElement("div");
        displayProgress.className =
          "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayProgress.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text">
                    task id : ${progress.task_id} <br>
                    completion date : ${progress.completion_date.split(' ')[0]} <br>
  
                        notes : ${progress.notes}
                    </p>
                </div>
            </div>
            `;
       myProgressList.appendChild(displayProgress);
      });
    };
    
    fetchMethod(currentUrl + "/api/task_progress/user", callbackMyProgressList, 'GET' , data=null, token );
    }
  

function addModal(txt) {
    const mod = document.getElementById("responseModal");
    mod.innerHTML = `
    <div class="modal fade" id="resModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="resTitle">${txt}</h5>
        </div>
      </div>
    </div>
    </div>`;
}


// to edit existing progress 
function edit() {
    const tasks = document.getElementById('myTasks');

    const cb = (responseStatus, responseData) => {

        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        content = '';

        if (responseStatus != 404) {
            for (elem of responseData) {
                content += `<option value="${elem.progress_id}"> Task ID : ${elem.task_id} | Date : ${elem.completion_date.split(' ')[0]} | Notes : ${elem.notes}</option>`
            }

        tasks.innerHTML = `    
            <div class="container justify-content-center" style = "padding-left:80px; padding-right:80px">
        <select id = "selectProgress" class="form-control">
            <option selected>Select progress</option>
            ${content};
        </select>
    </div>
    `;

        // to get the selected item from the dropdown 
        const dropdown1= document.getElementById("selectProgress");
        selectedVal = '';
        dropdown1.addEventListener('change', function () {
            selectedVal = dropdown1.value;
            console.log('selected value ' + selectedVal);
        })

        const button1 = document.getElementById('editButton');

        button1.addEventListener('click', () => {
            functionToEdit(selectedVal); 
        })

    }
}

    fetchMethod(currentUrl + "/api/task_progress/user" , cb, "GET", data=null, token);

    content = '';
}


// to make the put request 

function functionToEdit(num) {

    const yepp = document.getElementById("notesEdit").value; 

    if (num== '' ||yepp == '') {
        addModal('Missing data.')
        $('#resModal').modal('show');
        progressForm.reset();
        return;
    }
    else {

    const callbackProgressEdit = (responseStatus, responseData) => {

        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 401) {
            $('#tokenModal').modal('show');
        }
        if( responseStatus == 200) {
            addModal(responseData.message);
            $('#resModal').modal('show');
            progressEditForm.reset();
            // showMyProgress();
            location.reload();

        }
    }

        const data = {
            progress_id: num,
            notes: yepp
        }
        fetchMethod(currentUrl + `/api/task_progress/${num}` , callbackProgressEdit, 'PUT', data, token);

    }
}


// to create New progress
function createNew() {
    const tasks = document.getElementById('taskChoice');

    const taskListCallback = (responseStatus, responseData) => {

        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        contentt = ''; 

        if (responseStatus != 404) {
        for (elem of responseData) {
            contentt += `<option value="${elem.task_id}">${elem.task_id}. ${elem.title}</option>`
        }

        tasks.innerHTML = `    
        <div class="container justify-content-center col-8">
    <select id = "selectTask" class="form-control">
        <option value="selected">Select task</option>
        ${contentt};
    </select>
</div>
`;
        const dropdown = document.getElementById("selectTask");
        selectedValue = '';
        dropdown.addEventListener('change', function () {
            selectedValue = dropdown.value;
            console.log('selected value ' + selectedValue);
        })

        const button = document.getElementById('createButton');

        button.addEventListener('click', () => {

            functionToCreate(selectedValue); 

        })

    }
}

    fetchMethod(currentUrl + "/api/tasks", taskListCallback);
    contentt = '';
}

// to make the POST request 
function functionToCreate(num1) {

    const dateString = document.getElementById("date").value.split(' ')[0];
    if (num1== '' || dateString == '') {
        addModal('Missing data.')
        $('#resModal').modal('show');
        progressForm.reset();
        return;
    }
    else {
    const callbackProgressCreate = (responseStatus, responseData) => {

        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 401) {
            $('#tokenModal').modal('show');
        }
        if (responseStatus == 201) {
            getPoints(num1)
            addModal(responseData);
            $('#resModal').modal('show');
            location.reload();
            loadPoints();
            progressForm.reset();
                        // location.reload();
        }

    }

    const yep = document.getElementById("notes").value;

    const data = {
        task_id: num1,
        completion_date: dateString,
        notes: yep
    }

    fetchMethod(currentUrl + `/api/task_progress`, callbackProgressCreate, 'POST', data, token);
}

}

// to get points for performing tasks whenever a progress is created 
// num = task id 
function getPoints(num) {
    const callBackForPoints = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus == "401") {
            $('#tokenModal').modal('show');
        }

    }

    fetchMethod(currentUrl + `/api/user/tasks/${num}` , callBackForPoints, 'GET', data=null, token)
}