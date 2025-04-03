// to display pet leaderboard
const callbackPetRank = (responseStatus, responseData) => {

    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const petList = document.getElementById("petRank");
    responseData.forEach((pet) => {
      const displayItem = document.createElement("tr");
      displayItem.innerHTML = `

      <td>${pet.leaderboard_rank}</td>
      <td>${pet.pet_name}</td>
      <td>${pet.type}</td>
      <td>${pet.pet_level}</td>
      <td>${pet.user_id}</td>

          `;

          petList.appendChild(displayItem);
          });
  };

  fetchMethod(currentUrl + "/api/pet/leaderboard", callbackPetRank, "GET");