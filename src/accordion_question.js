const questionArray = Array.from(document.getElementsByClassName("question_wrapper"));
const addboxArray = Array.from(document.getElementsByClassName("addbox"));
const minusboxArray = Array.from(document.getElementsByClassName("minusbox"));
const answerArray = Array.from(document.getElementsByClassName("content_answer"));
const measureArray = [];


//quickly measure the answers then hide them
for (let i = 0; i < answerArray.length; i++) {
  measureArray.push(answerArray[i].scrollHeight);
  answerArray[i].style.height = "0px";
  answerArray[i].classList.add("content_answer_hidden");
}



// add event listener to each element in the questionArray
for (let i = 0; i < questionArray.length; i++) {
  questionArray[i].addEventListener("click", () => {
    if (questionArray[i].classList.contains("question_wrapper_off")) {
      questionArray[i].classList.remove("question_wrapper_off");
      questionArray[i].classList.add("question_wrapper_on");
    } else {
      questionArray[i].classList.remove("question_wrapper_on");
      questionArray[i].classList.add("question_wrapper_off");
    }
    if (!answerArray[i].classList.contains("content_answer_hidden")) {
      answerArray[i].classList.add("content_answer_hidden");
      answerArray[i].style.height = "0px";
    } else {
      answerArray[i].classList.remove("content_answer_hidden");
      answerArray[i].style.height = measureArray[i] + "px";
    }


    if (addboxArray[i].classList.contains("question_box_hidden")) {
      addboxArray[i].classList.remove("question_box_hidden");
      addboxArray[i].classList.add("question_box_showing");
    } else {
      addboxArray[i].classList.remove("question_box_showing");
      addboxArray[i].classList.add("question_box_hidden");
    }

    if (minusboxArray[i].classList.contains("question_box_showing")) {
      minusboxArray[i].classList.remove("question_box_showing");
      minusboxArray[i].classList.add("question_box_hidden");
    } else {
      minusboxArray[i].classList.remove("question_box_hidden");
      minusboxArray[i].classList.add("question_box_showing");
    }



  });
}
