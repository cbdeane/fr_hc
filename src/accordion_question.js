const objectArray = Array.from(document.getElementsByClassName("section_questions"));
const questionArray = Array.from(document.getElementsByClassName("content_questions"));
const addboxArray = Array.from(document.getElementsByClassName("addbox"));
const minusboxArray = Array.from(document.getElementsByClassName("minusbox"));
const answerArray = Array.from(document.getElementsByClassName("content_answer"));

// add event listener to each element in the questionArray
for (let i = 0; i < questionArray.length; i++) {
  questionArray[i].addEventListener("click", () => {
    if (questionArray[i].classList.contains("content_questions_closed")) {
      questionArray[i].classList.remove("content_questions_closed");
      questionArray[i].classList.add("content_questions_opened");
    } else {
      questionArray[i].classList.remove("content_questions_opened");
      questionArray[i].classList.add("content_questions_closed");
    }

    if (answerArray[i].classList.contains("content_answer")) {
      answerArray[i].classList.remove("content_answer");
      answerArray[i].classList.add("content_answer_hidden");
    } else {
      answerArray[i].classList.remove("content_answer_hidden");
      answerArray[i].classList.add("content_answer");
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
