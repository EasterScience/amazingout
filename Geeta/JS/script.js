

async function get_json(url) {
  // Storing response
  const response = await fetch(url);
   
  // Storing data in form of JSON
  var data = await response.json();
  var slokas_list = [];
  var flag = true;
  //console.log(data);
  var i = 1;

  do {
    //console.log("index", i)
    if (typeof data[i] == 'undefined'){
      flag = false;
    }
    else{
    slokas_list[i] = data[i];
    i++;
    }
  }
  while (flag == true);

  console.log("SLOKAS LIST:", slokas_list)
  
  /*
  if (response) {
      hideloader();
  }
  */
 // var output_list = await Promise.all(slokas_list)
 //console.log("OUT: ", output_list)
 return slokas_list;

}



// Adding data into the slide (sloaks)
async function add_data(slokas) {
  //console.log("Slokas New:", slokas)
  // Create a slide for each sloka
  for (var i = 1; i < slokas.length; i++) {

    var slide = document.createElement('div');
    slide.classList.add('slide');

    var slokaElement = document.createElement('h3');
    slokaElement.classList.add('sloka');
    //console.log("Sloak", slokas[i])
    slokaElement.textContent = slokas[i].sloka;
    slide.appendChild(slokaElement);

    var meaningElement = document.createElement('p');
    meaningElement.classList.add('meaning');
    meaningElement.textContent = slokas[i].meaning;
    slide.appendChild(meaningElement);

    var e_meaningElement = document.createElement('p');
    e_meaningElement.classList.add('e_meaning');
    e_meaningElement.textContent = slokas[i].e_meaning;
    slide.appendChild(e_meaningElement);

    const slider = document.getElementById('slider');
    slider.appendChild(slide);
  };
};


// Hide all the slides
function hide_slides(slides){
  //const slides = '';
  //slides = document.querySelectorAll(".slide");
  //console.log("SL:", slides)
  if (slides){
        //Hide all slides
  slides.forEach(slide => {
    slide.style.display = "none";
  });
  };
  //return slides;
}

async function main(){
    // Main function
  var slides_list = [];
  var slokas = '';

  const json_file_path = "./JSON/Geeta_v2.json";
  //const json_file_path = "E:\WORK\Python\Projects\APP\NARAYANA\data\Geeta_v1.json"
  var total_sloaks = await get_json(json_file_path);

  // Creating slides with sloaks
  await add_data(total_sloaks);
  
  const slides = document.querySelectorAll(".slide");
  hide_slides(slides);
  var currentSlide = 0;

  slides[currentSlide].style.display = "block"
  // Add event listeners for the next and previous buttons
  var nextButton = document.getElementById('next-button');
  nextButton.addEventListener("click", function() {
    console.log('Next');
    //console.log("SLIDES Global: ", slides);
    hide_slides(slides);
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    slides[currentSlide].style.display = "block";
    //slider.style.left = '-' + currentSlide * slider.offsetWidth + 'px';
  });

  var previousButton = document.getElementById('previous-button');
    previousButton.addEventListener('click', function() {
      console.log('Previous');
      hide_slides(slides);
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }
      slides[currentSlide].style.display = "block";
      //slider.style.left = '-' + currentSlide * slider.offsetWidth + 'px';
    });

};


main();