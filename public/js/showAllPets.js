
// import { petImgAry } from "./img";
const petImgAry = ['https://img.freepik.com/free-vector/cute-cow-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-flat_138676-7823.jpg?w=740&t=st=1705910312~exp=1705910912~hmac=e9a7482295b15b958c6e63cb264f9f6260a79bb175eff1c379ff3c2e2b12dc49', 'https://img.freepik.com/free-vector/cute-husky-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium_138676-4567.jpg?w=740&t=st=1705910427~exp=1705911027~hmac=1ab66ec0c1913b3fb65669c0731f76676fb5d1af6fbb391b0ed7271a68313b81', 'https://img.freepik.com/free-vector/cute-cat-with-love-sign-hand-cartoon-illustration-animal-nature-concept-isolated-flat-cartoon-style_138676-3419.jpg?w=740&t=st=1705910444~exp=1705911044~hmac=7262001a183de86b5f215b5246fcbe1225e120ef6aece6f3c92d45d6cf32b6dd', 'https://img.freepik.com/free-vector/cute-pig-meditation-yoga-cartoon-vector-icon-illustration-animal-sport-icon-concept-isolated-flat_138676-8643.jpg?w=740&t=st=1705913843~exp=1705914443~hmac=3fd142e390996494da385329d379916c85d6f68332837651edef45afaf7308eb', 'https://img.freepik.com/free-vector/hand-drawn-cartoon-pufferfish-illustration_52683-122463.jpg?w=740&t=st=1705913870~exp=1705914470~hmac=ce18bce0362eea5b56d538070db24202e7b475cdeab395d9c46c40ae3850cd89', 'https://img.freepik.com/free-vector/flat-cute-frog-illustration_52683-62357.jpg?w=740&t=st=1705913916~exp=1705914516~hmac=cd236b6925d37de81c89c480bc9551ce363d4bf51028f12097a55f372c95490b', 'https://img.freepik.com/free-vector/cute-hamster-holding-cheek-cartoon-illustration_138676-2773.jpg?w=740&t=st=1705913932~exp=1705914532~hmac=9efda59b31f308bb79baaa6372d148c5e8cf5a1746b7aaef2595ebcaa2721309', 'https://img.freepik.com/free-vector/adorable-marine-ajolote-illustration_23-2149222001.jpg?w=740&t=st=1705913983~exp=1705914583~hmac=4c0fce58f5b4c53935ad91f1ee4242294481aea2b59bff1ec17d69c9b758c8ca', 'https://img.freepik.com/free-vector/flat-cartoon-clam-illustration_52683-121638.jpg?w=740&t=st=1705913995~exp=1705914595~hmac=9971c81dd172c689bfb01861d37955d8034cb7a74714247b8760f1711613a9ae', 'https://img.freepik.com/free-vector/cute-squirrel-standing-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium_138676-6545.jpg?w=740&t=st=1705914042~exp=1705914642~hmac=fe5bdc469a6cacbfa719a9fc878f4c338dae2640797049b61c4a08cddcbc33b1',
  'https://img.freepik.com/free-vector/cute-bee-flying-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector_138676-6016.jpg?w=740&t=st=1705914056~exp=1705914656~hmac=2334e69bdd11b35bb25ccf5fac6b806a6ad54968a1f84ca5279870f0ca5f69fc', 'https://img.freepik.com/free-vector/cute-rabbit-with-carrot-bag-cartoon-vector-icon-illustration-animal-education-icon-concept-isolated_138676-5813.jpg?w=740&t=st=1705914064~exp=1705914664~hmac=1e68ae20d9b10c3dfe80bf7683dcbbecdf5a14bcb0fe320b844b4451c205d27d', 'https://img.freepik.com/free-vector/hen-with-chick-cartoon-illustration_138676-2054.jpg?w=740&t=st=1705914100~exp=1705914700~hmac=b7f6a55e4e66efef1da2889cbefcd5f8589f15ecd3ded49a59136a5a0d3bd0cc', 'https://img.freepik.com/free-vector/cute-elephant-sitting-waving-hand-cartoon-vector-icon-illustration_138676-2220.jpg?w=740&t=st=1705914118~exp=1705914718~hmac=c618b2b064a5367a7de3f7e96e42deaef6608cb04a35c8cfa4e9534b138747e4', 'https://img.freepik.com/free-vector/cute-panda-with-bamboo_138676-3053.jpg?w=740&t=st=1705914136~exp=1705914736~hmac=0ad0091c0ed54c10668da597ecdc3da212beae432f2ee6ee3f21b1f8c5274d65', 'https://img.freepik.com/free-vector/cute-tiger-excited-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat-vector_138676-8205.jpg?t=st=1705914054~exp=1705914654~hmac=d5298a1285d484fd57386e4d9a2ed3681e80cc1820fb48e8944c0639125dcca3', 'https://img.freepik.com/free-vector/cute-corgi-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4181.jpg?w=740&t=st=1705917483~exp=1705918083~hmac=669ccfcb32a39089a2e2f0b36a4a57e2d5b004dcbc5fc4d66bc2b66cb4fb707b', 'https://img.freepik.com/free-vector/cute-baby-green-dragon-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-4674.jpg?size=626&ext=jpg&ga=GA1.1.312035173.1703342323', 'https://img.freepik.com/free-vector/cute-lion-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium_138676-4856.jpg?w=740&t=st=1705919211~exp=1705919811~hmac=6386ab657eaa77e207f4b87b33ed50d82c2c2b17e3bf14c7dd7e38c0b815667e', 'https://img.freepik.com/free-vector/cute-sloth-hug-big-doughnut-cartoon-icon-illustration_138676-2327.jpg?t=st=1705919211~exp=1705919811~hmac=bd82040720141d6b218ef619e0d747d3a035ed674b6e083e2d2f903210cc717d',
  'https://img.freepik.com/free-vector/cute-squid-swimming-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium_138676-6021.jpg?w=740&t=st=1705925563~exp=1705926163~hmac=167538d345674693d0bfef88d0b806ed6a861137130399da1c24e540128d2ddd', 'https://img.freepik.com/free-vector/happy-shiba-inu-dog-japan-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3650.jpg?w=740&t=st=1705925625~exp=1705926225~hmac=b0eb9c5c8f54e52750b46e973d282691470041409888e6de4f4aa09184a0a987', 'https://img.freepik.com/free-vector/cute-caterpillar-standing-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-8297.jpg?t=st=1705925638~exp=1705926238~hmac=16f064f25c1b6bf914b3408944731f0ad0c7708f6102872fb4c62a13d27fa5f7', 'https://img.freepik.com/free-vector/cute-goat-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat_138676-4606.jpg?t=st=1705925638~exp=1705926238~hmac=a3c6844a8c634109bb8658c2f5893e71f738b6cea1fa92bd03e5208b10b6958b', 'https://img.freepik.com/free-vector/cute-horse-walking-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium_138676-4712.jpg?t=st=1705925638~exp=1705926238~hmac=20194f6c3f6809ee8fe09d09f7c8ce82cbacd77eb29046706df9db7c3a2309f5', 'https://img.freepik.com/free-vector/cute-baby-dragon-with-fire-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-8670.jpg?t=st=1705925638~exp=1705926238~hmac=d8e8fbc18d97f1478c9683752f293f4cf05b2818a01a654f06b45c89ea8b38eb', 'https://img.freepik.com/free-vector/cute-angry-red-dinosaur-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-6013.jpg?t=st=1705925638~exp=1705926238~hmac=df06e67a006fbc1df8c8f04dde2cbe366f451c44416f214f5182c624023a0279', 'https://img.freepik.com/free-vector/cute-hippo-waving-hand-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium_138676-4749.jpg?w=740&t=st=1705925683~exp=1705926283~hmac=5496aaf81d81c6888959e2c4486c31aa8137188f7c99e7dccb96e6f8bb1c90ee', 'https://img.freepik.com/free-vector/cute-raccoon-dabbing-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3374.jpg?t=st=1705925638~exp=1705926238~hmac=9f647b7c3f97f9032c5b349acc74a952865864a59adc4c7e87d200c3fa8c8b00',
  'https://img.freepik.com/free-vector/cute-sheep-meditation-yoga-cartoon-vector-icon-illustration-animal-sport-icon-concept-isolated-flat_138676-8642.jpg?w=740&t=st=1705925718~exp=1705926318~hmac=9ff226d0c3520dfbdd32f140de9fb88a33a6cb5116db68581d2c80941a4ed493', 'https://img.freepik.com/free-vector/cute-owl-with-book-cartoon-illustration_138676-3222.jpg?t=st=1705925735~exp=1705926335~hmac=2af24337acd63b3cb265ba0f19c3346869f7758266700104d93620d4e5692c45', 'https://img.freepik.com/free-vector/cute-turtle-meditation-yoga-cartoon-vector-icon-illustration-animal-sport-icon-concept-isolated_138676-6833.jpg?t=st=1705925735~exp=1705926335~hmac=5c82df6a18debcdc7e4dd8b9d9f3c6b9d462acdabc227df17d8ccb879351df3f', 'https://img.freepik.com/free-vector/cute-koala-sleeping-tree-cartoon-animal-nature-icon-concept-isolated-flat-cartoon-style_138676-2366.jpg?t=st=1705925735~exp=1705926335~hmac=3f1aa6ce4990f6a36cc42011bad07cc3ae18c7d1743a9f022f952213df6e6359', 'https://img.freepik.com/free-vector/cute-bear-hug-washing-machine-cartoon-vector-icon-illustration-animal-technology-icon-isolated-flat_138676-8800.jpg?w=740&t=st=1705925810~exp=1705926410~hmac=99835fe4605b2d4738a55437a4b70a23de3e83e35bddc13ab890ed089c7a17c6', 'https://img.freepik.com/free-vector/cute-polar-bear-sleeping-ice-cartoon-vector-icon-illustration-animal-nature-icon-isolated-flat_138676-6858.jpg?w=740&t=st=1705925822~exp=1705926422~hmac=f20a512b25aa806c2f2d7a4275ad09d7adcc2277b677b83f81c7d0cd856e7caa', 'https://img.freepik.com/free-vector/cute-kangaroo-boxing-cartoon-vector-icon-illustration-animal-sport-icon-concept-isolated-vector_138676-4450.jpg?w=740&t=st=1705926259~exp=1705926859~hmac=8aa0064484b44d17237a1cb9cefee9c93f46def08225bae53a1e0d8af7cff334']

const callbackAllPet = (responseStatus, responseData) => {

  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const petList = document.getElementById("petList");
  responseData.forEach((pet) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
    displayItem.innerHTML = `
    <style>    
    .card{
      perspective: 1000px;
    }

    .flipcard-front, .flipcard-back {
      position: relative; 
      backface-visibility: hidden;
      transform-style: preserve-3d;
      transition: transform 0.6s;
      width: 100%;
    }

    .flipcard-front {
      transform: rotateY(0deg);
    }

    .flipcard-back {
      transform: rotateY(180deg);
    }

    .card:hover .flipcard-front {
      transform: rotateY(-180deg);
    }

    .card:hover:hover .flipcard-back {
      transform: rotateY(0deg);
    }

</style>
<div class="card">
<div class = "flipcard-front"> 
    <img src=${petImgAry[pet.store_id - 1]} class="card-img-top" alt="pet image">
        <h5 class="card-title">${pet.type}</h5>
        <p class="card-text">
            points: ${pet.points} 
        </p>         
      </div> 
  <div class="flipcard-back">
      <p class="card-text">
       ${pet.msg} 
      </p>   
  </div>
  <a href="singlePetInfo.html?store_id=${pet.store_id}" class="btn btn-primary">Adopt!</a>

  </div>
      
          `; 


          petList.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + "/api/pet", callbackAllPet);

