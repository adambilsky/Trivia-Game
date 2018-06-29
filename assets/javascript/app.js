// This is the Trivia Game Script

// GENERAL NOTES AND DESIGN ALGORITHM
// - The current version has 5 questions, each with 4 answer choices (1 correct and 3 incorrect).
    // Each question, correct answer, and incorrect answers comprise separate arrays within a larger object.
    // The five question "sets" are part of a larger object, the Question Bank.

// - In the HTML, there should be a single question/game <div> to hold each question set.
    // A function will defined to perform the following actions:
    // 1) In a randomly determined, non-repeating order, pull each question set from the Bank.
    // *** DONE 2) Push the 'question text' into the question section of the game <div>.
    // *** DONE 3) Shuffle (apply a randomized sequence to) the questions.
    // *** DONE 4) Assign the randomized questions to buttons in the game <div>. 
    // *** DONE 5) The purpose of randomization in steps 1 and 3 is to avoid a predictable answer sequence,
    // and, in higher-stakes testing settings, to prevent cheating or answer-sharing.
    // The sequencing should also allow for simplified code, since a separate page is not required
    // for each question.

// *** DONE Players have 30 seconds to answer each question. This requires a countdown timer
// that is also displayed for the User. If the User does not submit an answer before time expires,
// The answer will be logged as "incorrect."

$(document).ready(function() {
// Scoring
    // We will need variables to store the rolling number of 
    // correct, incorrect, and unanswered (timed-out) questions
    var initialize = function() {
        correct = 0;
        incorrect = 0;
        timedOut = 0;
        questionNumber = 0;
        questionsAnswered = 0;
           
    }

    var correct = 0;
    var incorrect = 0;
    var timedOut = 0;
    var questionNumber = 0;
    var questionsAnswered = 0;    


// Question text section
    // Each question will need a question TEXT, a corresponding CORRECT answer, 
    // and a set of (THREE) incorrect answers.
    // This bank is an ARRAY of OBJECTS, allowing the program to cycle through the questions 
    // by their index position.
    var questionBank = [
        {
            number: 1,
            questionText: "The actor who portrayed Indiana Jones’ father in the films was:",
            answers: ["Sean Connery","Michael Caine", "Terrence Stamp", "Jonathan Pryce"],
            correctAnswer: {
                value: true,
                text: "Sean Connery",
                image: "<img src='assets/images/indiana-connery.gif'>"
            },
            incorrectAnswers: {
                value: false,
                text: ["Michael Caine", "Terrence Stamp", "Jonathan Pryce"]
            }
        },
        {
            number: 2,
            questionText: "In 'Back to the Future,' the time machine transported Marty back to the year:",
            answers: ["1955","1985", "1941", "1969"],
            correctAnswer: {
                value: true,
                text: "1955",
                image: "<img src='assets/images/doc-brown.gif'>"

            },
            incorrectAnswers: {
                value: false,
                text: ["1985", "1941", "1969"]
            },
        },
        {
            number: 3,
            questionText: "'The Breakfast Club,' according to their letter to the principal, consisted of ‘a brain, an athlete, a princess, a basket case,’ and a:",
            answers: ["criminal", "neo-maxie-zoom dweebie", "burner", "wastoid"],
            correctAnswer: {
                value: true,
                text: "criminal",
                image: "<img src='assets/images/bc-criminal.gif'>"

            },                
            incorrectAnswers: {
                value: false,
                text: ["neo-maxie-zoom dweebie", "burner", "wastoid"]
            },
        },
        {
            number: 4,
            questionText: "In the 1984 movie 'Ghostbusters,' Rick Moranis’ character was possessed by:",
            answers: ["Vinz Klortho, Keymaster of Gozer","the Stay-Puft Marshmallow Man", "Vigo the Carpathian", "Slimer"],
            correctAnswer: {
                value: true,
                text: "Vinz Klortho, Keymaster of Gozer",
                image: "<img src='assets/images/ghostbusters.gif'>"

            },
            incorrectAnswers: {
                value: false,
                text: ["the Stay-Puft Marshmallow Man", "Vigo the Carpathian", "Slimer"]
            },
        },
        {
            number: 5,
            questionText: "The movie 'Hard to Hold' was about a musician, played by real-life rocker:",
            answers: ["Rick Springfield","Glenn Frey", "Joe Walsh", "Robert Plant"],
            correctAnswer: { 
                value: true,
                text: "Rick Springfield",
                image: "<img src='assets/images/springfield.gif'>"

            },
            incorrectAnswers: {
                value: false,
                text: ["Glenn Frey", "Joe Walsh", "Robert Plant"]
            }
        }
    ];


    // Each question is really a timed event function 
    // which gives the player x (15) seconds to click a button.
    //  Set our number counter to 15.
    var number = 16;

    //  Variable to hold our interval ID when we execute the "run" function
    var intervalId;

    //  When an answer button gets clicked, run the stop function.
    $(".answerBtn").on("click", stop);

    //  The "gameTimer" function sets an interval that runs the "decrement" function once a second.
    function gameTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    //  The decrement function: 
    function decrement() {

        //  Decrease number by one.
        number--;

        //  Show the number in the #show-number tag.
        $("#show-number").html("Time left: " + number + "<br>");

        //  Once number hits zero...run the stop function
        //  and alert the user that time is up.

        if (number === 0) {
        stop();
        evaluate($(this).attr("data-choice"));
        
        }
    }

    //  The stop function
    function stop() {
        //  Clears our intervalId by passing the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);
    }
    
    //  Execute the gameTimer function.

    // Clicking the answer button(s) will stop the countdown function
    // The result of the click will be stored in the score variables
    var nextMove = function () {
        $("#scoreBox").html("Correct: " + correct + "  Incorrect: " + incorrect);
        console.log(" Questions Answered: " + questionNumber);
        if (questionsAnswered<5) {   
            getQuestion();
        }
        else {
            alert("Thanks for playing! Final score: Correct: " + correct + " Incorrect: " + incorrect);
            $("#answerButtons").empty();
            $("#questionText").html("Final score: Correct: " + correct + " Incorrect: " + incorrect);

        }
    }

    var getQuestion = function() {
        
        // resets the question timer and starts the clock
        number=16;
        gameTimer();
        
        // var randomizeQuest = function () {
        //     for (var q = 0; q < questionBank.length; q++) {
        //         var random = Math.floor(Math.random() * questionBank.length +1);
        //         if(questionBank.indexOf(random)===-1) {
        //             randomQuestionArray.push(questionBank[random].questionText);
        //         }
        //         else {
        //             randomizeQuest();
        //         }
        //     }
        // }
        // randomizeQuest();

        $("#answerButtons").empty();
        var htmlQuestion = "<h5>Question #" +questionBank[questionNumber].number + ": " + questionBank[questionNumber].questionText + "</h5>";
        document.querySelector("#questionText").innerHTML = htmlQuestion;
               

        // *** ANSWER SHUFFLER 
        // A sequence that will randomize the answer choices 
        // so not all correct answers are in the same place in each set of buttons
        // Create an empty array
        var randomArray = [];
        var notRandomArray = [1,2,3,4];
        var randomAnswerArray = [];
        var randomQuestionArray = [];

        // run a loop to generate a random sequence of numbers from 1-4
        var randomizeAns = function () {
            for (var r = 0; randomArray.length<4; r++) {
                var random = Math.floor(Math.random() * notRandomArray.length);
                if (randomArray.indexOf(random)===-1) {
                    randomArray.push(random);
                    randomAnswerArray.push(questionBank[questionNumber].answers[random])
                }
                else {
                    randomizeAns();
                }
            }
        }
        randomizeAns()

        // *** BUTTON CREATION AND CONTENT POPULATION: ***
        // 1. Create a for-loop to iterate through the answer choices array.
        for (var i = 0; i < questionBank[questionNumber].answers.length; i++) {

            // 2. Create a variable named "answerBtn" equal to $("<button>");
            var answerBtn = $("<button>");
            // 3. Then give each "answerBtn" the following classes: "answer-button" "answer-text" "answer-button-color".
            answerBtn.addClass("answer-button answer-text answer-button-color");
            // 4. Then give each "answerBtn" a data-attribute called "data-choice".
            answerBtn.attr("data-choice", randomAnswerArray[i]);
            // 5. Then give each "answerBtn" a text equal to "questionBank[questionNumber].answers[i]".
            answerBtn.text(randomAnswerArray[i]);
            // 6. Finally, append each "answerBtn" to the "#buttons" div (provided).
            $("#answerButtons").append(answerBtn);
        }

        // *** BUTTON RESPONSE AND ANSWER EVALUATION: ***
        $(".answer-button").on("click", function() {
            stop();
            evaluate($(this).attr("data-choice"));
        })    
    }
    
    // *** ANSWER EVALUATION AND RESPONSE
    var evaluate = function(userChoice) {
        if (userChoice===questionBank[questionNumber].correctAnswer.text) {
            $("#questionText").html("<h4>Yes, '" + questionBank[questionNumber].correctAnswer.text + "' is correct! Great Job! </h4>")
            $("#answerButtons").html(questionBank[questionNumber].correctAnswer.image);
            correct++;    
        }
        else {
            $("#questionText").html("<h4>Ooh, sorry. The CORRECT answer was: '" + questionBank[questionNumber].correctAnswer.text + "'.</h4>")
            incorrect++;
        }
  
        // selector=0;
        
        // chooses the next question
        questionNumber++;

        // increases the count of questions answered (for knowing when the game is over)
        questionsAnswered++;

        setTimeout(nextMove, 3000);
    }
    getQuestion();

    // General notes:
    // Note the demo video made a point that the pages did not RELOAD when restarting the quiz.
})