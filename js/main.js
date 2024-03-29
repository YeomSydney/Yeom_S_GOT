(() => {
     console.log('fired');

     // variables at the top
     const sigils = document.querySelector('#navList'),
          banner = document.querySelector('#houseImages'),
          lightBox = document.querySelector('.lightbox'),
          vid = lightBox.querySelector('video'),
          vidPlay = document.querySelector('#play'),
          vidPause = document.querySelector('#pause'),
          vidReplay = document.querySelector('#replay'),
          houseName = document.querySelector('h1'),
          houseDescription = document.querySelector('.house-info');

     // adding house into using arrays -> this is what you would do for your FIP as well
     const houseInfo = [
          ['Stark', `House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.`],
          //houseInfo[0][0] -> gets the first index of the subarray (the house name)

          ['Baratheon', `House Baratheon of Storm's End is a legally extinct Great House of Westeros. A cadet branch was formerly the royal house, but House Lannister now controls the throne. House Baratheon traditionally ruled the Stormlands on the eastern coast of Westeros, aptly named for its frequent storms, from their seat of Storm's End.

          House Baratheon became the royal house of the Seven Kingdoms after Robert Baratheon led a rebellion against the Targaryen dynasty. At the end of the rebellion, Robert ascended the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark.

          `], //houseInfo[1][1] -> gets the second index of the subarray (the house description)

          ['Lannister', `House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and most powerful families and oldest dynasties. It is also the current royal house of the Seven Kingdoms following the extinction of House Baratheon of King's Landing, which had been their puppet house anyway.

          The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a massive rocky promontory overlooking the Sunset Sea which has had habitations and fortifications built into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of the West. As the new royal house, they also rule directly over the Crownlands from their seat of the Red Keep in King's Landing, the traditional seat of the royal family.`],

          ['Tully', `House Tully of Riverrun is an exiled Great House of Westeros. Its most senior member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue background. Their house words are "Family, Duty, Honor."`],

          ['Greyjoy', `House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.

          House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the faith of the Drowned God. `],

          ['Arryn', `House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Lords Paramount of the Vale and Wardens of the East under the Targaryen kings and Baratheon-Lannister kings. The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with his stepfather Petyr Baelish acting as Lord Protector until he reaches the age of majority. `],

          ['frey', 'House Frey of the Twins was the Great House of the Riverlands, having gained their position for their treachery against their former liege lords, House Tully, who were stripped of all their lands and titles for their rebellion against the Iron Throne; House Tully had supported the independence movement for the Kingdom of the North. The current head of the house is unknown following the assassinations of Lord Walder Frey and two of his sons, Lothar Frey and Walder Rivers, by the vengeful Arya Stark. This is made more complex by the subsequent assassination of all the male Freys soon after.'],

          ['targaryen', "House Targaryen of Dragonstone is a Great House of Westeros and was the ruling royal House of the Seven Kingdoms for three centuries since it conquered and unified the realm, before it was deposed during Robert's Rebellion and House Baratheon replaced it as the new royal House. The few surviving Targaryens fled into exile to the Free Cities of Essos across the Narrow Sea. Currently based on Dragonstone off of the eastern coast of Westeros, House Targaryen seeks to retake the Seven Kingdoms from House Lannister, who formally replaced House Baratheon as the royal House following the destruction of the Great Sept of Baelor."],

          ['tyrell', "House Tyrell of Highgarden is an extinct Great House of Westeros. It ruled over the Reach, a vast, fertile, and heavily-populated region of southwestern Westeros, from their castle-seat of Highgarden as Lords Paramount of the Reach and Wardens of the South after taking control of the region from House Gardener during the Targaryen conquest. The House was formerly led by Lord Mace Tyrell. Mace's son Loras was a noted tournament knight and, secretly, the lover of Lord Renly Baratheon."]
     ];

     function vidPlayBtn(event) {
          if (vid.paused === true) {
               vid.play();
          }
     }

     function vidPauseBtn(event) {
          if (vid.paused === false) {
               vid.pause();
          }
     }

     function vidReplayBtn(event) {
          vid.currentTime = 0;
     }

     function playVideo() {
          vid.play();
     }

     function setHouseData(name, desc) {
          houseName.textContent = `House ${name}`;
          houseDescription.textContent = desc;
     }

     function setVideoSource(house) {
          
          let targetSource = `video/House-${house.charAt(0).toUpperCase() + house.slice(1)}.mp4`;
          
          vid.src = targetSource;
          vid.load();
          playVideo();

     }

     // functions go here
     function animateBanner(event) {
          if (event.target.className.includes('sigilContainer')) {
               let multiplier = event.target.dataset.offset,
               // two different offsets.
                    offsetWidth = 600;
               // 0, 600, 1200, 1800 depending on the math
               banner.style.right = `${multiplier * offsetWidth}px`;
               // move to right
          }
     }

     function popLightBox(event) {
          // change the text content on the page
          // and a class to open the lightbox

          if (event.target.className.includes('sigilContainer')) {
               setTimeout(function(){lightBox.classList.add('show-lightbox')}, 900);

               let targetHouse = event.target.className.split(" ")[1];
               setVideoSource(targetHouse);
               
               setHouseData(houseInfo[event.target.dataset.offset][0], houseInfo[event.target.dataset.offset][1]);

               lightBox.querySelector('.close').addEventListener('click', () => {
                    stopVideo();
                    lightBox.classList.remove('show-lightbox');
               })
          }
     }

     var trailer = document.getElementById("videoClosing");
     trailer.onended = function() {
     lightbox.classList.remove('show-lightbox')
     };

     // sigils.forEach(sigil => sigil.addEventListener('click', animateBanner));
     
     sigils.addEventListener('click', animateBanner);
     sigils.addEventListener('click', popLightBox);
     
     // vidController.addEventListener('click', playVideo);
     // vidController.addEventListener('click', stopVideo);

     vidPlay.addEventListener('click', vidPlayBtn);
     vidPause.addEventListener('click', vidPauseBtn);
     vidReplay.addEventListener('click', vidReplayBtn);
})();
