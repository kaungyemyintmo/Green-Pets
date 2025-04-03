var token = localStorage.getItem("token")
console.log(token);

loadPoints();

  // to load user points 
  function loadPoints() {

    const userPointsCallback = (responseStatus, responseData) => {
      console.log(responseStatus); 
      console.log(responseData); 
    
      if (responseStatus == "401" ) {
        $('#tokenModal').modal('show');
      }

      const displayPoints = document.getElementById("userPoints");
 
      displayPoints.innerHTML = `
      <p> Total Points : ${responseData.total_points} </p>`;
        }
    
    fetchMethod(currentUrl + "/api/user/details", userPointsCallback, 'GET', data=null, token); 
    
    }