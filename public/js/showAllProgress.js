const callbackProgressList = (responseStatus, responseData) => {
    
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const progressList = document.getElementById("progressList");
    responseData.forEach((progress) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <p class="card-text">
                  ID : ${progress.progress_id} <br>
                  user id : ${progress.user_id} <br>
                  task id : ${progress.task_id} <br>
                  completion date : ${progress.completion_date.split(' ')[0]} <br>

                      notes : ${progress.notes}
                  </p>
              </div>
          </div>
          `;
     progressList.appendChild(displayItem);
    });
  };
  
  fetchMethod(currentUrl + "/api/task_progress", callbackProgressList);



