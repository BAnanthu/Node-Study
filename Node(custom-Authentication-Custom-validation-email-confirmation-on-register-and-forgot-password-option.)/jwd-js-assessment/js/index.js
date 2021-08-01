/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers - Done

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you. -Done

      3. Add 2 more questions to the app (each question must have 4 options). - Done 

      4. Reload the page when the reset button is clicked (hint: search window.location) -Done

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
  });

/*  Add an Event listener for the submit button */
  const submit = document.querySelector('#btnSubmit');
  const submitFunction = function(){
      const totalScore = calculateScore();
      const score = document.querySelector('#score');
      let correct = 0;
      let wrong = 0;
     //console.log(totalScore);   
      switch(totalScore){
        
        case 0: correct = 0, wrong = 5;
                 break; 
        case 20: correct = 1, wrong = 4;
                  break;
        case 40: correct = 2, wrong = 3;
                  break;
        case 60: correct = 3, wrong = 2;
                  break;
        case 80:  correct = 4, wrong = 1;
                  break;
        case 100: correct = 5, wrong = 0;
      }
     score.classList.add('fixed-top','text-right','text-info','font-weight-bold');
     score.innerHTML = `<p class='m-3'>YOU GOT ${totalScore}% MARKS!!</p>
                          <p class='m-3 text-success'>Correct Answers: ${correct}</p>
                          <p class='m-3 text-danger'>Wrong Answers: ${wrong}</p>`;
    clearInterval(countDownTime);
    const quizWrap = document.querySelector('#quizWrap');
    quizWrap.style.pointerEvents = "none";
  };

  submit.addEventListener('click',submitFunction);

 /*  Code to reload the page when the reset button is clicked */
  const reset = document.querySelector('#btnReset');
  reset.addEventListener('click',()=>{
    document.location.reload();
  });

  /* Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers */
  let startingTime = 1;
  let time = startingTime * 60;

  const countDownTime = setInterval(()=>{
      const min = Math.floor(time/60);
      let sec = time%60;

      sec = (sec<10)? '0'+ sec : sec;
      const countDownTimer = document.querySelector('#time');
      countDownTimer.classList.add('font-weight-bold');
      countDownTimer.innerHTML = `${min}:${sec}`;

      if(min == 0 && sec == 0){
        clearInterval(countDownTime);
        countDownTimer.innerHTML = 'Time is UP. Thanks!!';
        submitFunction();
        const quizWrap = document.querySelector('#quizWrap');
        const submit = document.querySelector('#btnSubmit');
        submit.style.pointerEvents = 'none';
        quizWrap.style.pointerEvents = 'none';
      }
      time--;
  },1000)


  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What is the Name of Google’s Parent Company ?',
      o: ['Alphabet Inc', 'Amazon', 'The Priceline Group', 'None of These'],
      a: 0,
    },
    {
      q: 'Who is the Current CEO of Microsoft ?',
      o: ['Babbage', 'Bill Gates', 'Bill Clinton', 'Satya Nadella'],
      a: 3,
    }
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
       // console.log(r);
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);
        // console.log(liElement);
        //console.log(radioElement);
        if (quizItem.a == i) {
          //change background color of li element here
          liElement.style.backgroundColor = 'green'; // answers are highlighting here
          liElement.style.transitionDuration = '1s'; 
        }
        if (radioElement.checked) {
          // code for task 1 goes here
         // console.log(radioElement);
          const str = radioElement.id;
          //console.log(str);
          const res = str.split('');
          //console.log(res[8]);
          // console.log(radioElement.name);
          const resLength = res.length;
         //  console.log(resLength);
          if (quizItem.a == res[resLength - 1]) {
            score += 20;
          } 
          else {
            //console.log(str);
            const selected = document.querySelector('#'+ str);
            //console.log(selected);
            parentElem = selected.parentElement;
           //console.log(parentElem);
            parentElem.style.backgroundColor = 'red';
            parentElem.style.transitionDuration = '2s'; 

          } 
      }
      }
    });
    return score;
  };

  // call the displayQuiz function
  displayQuiz();
});
