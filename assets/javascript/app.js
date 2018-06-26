// This is the Trivia Game Script

// GENERAL NOTES AND DESIGN ALGORITHM
// - The current version has 5 questions each with 4 answer choices (1 correct and 3 incorrect).
    // Each question, correct answer, and incorrect answers comprise separate arrays within a larger object.
    // The five question "sets" are part of a larger object, the Question Bank.

// - In the HTML, there should be a single question/game <div> to hold each question set.
    // A function will defined to perform the following actions:
    // 1) In a randomly determined, non-repeating order, pull each question set from the Bank.
    // *** DONE 2) Push the 'question text' into the question section of the game <div>.
    // 3) Shuffle (apply a randomized sequence to) the questions.
    // *** DONE 4) Assign the randomized questions to buttons in the game <div>. 
    // 5) The purpose of randomization in steps 1 and 3 is to avoid a predictable answer sequence,
    // and, in higher-stakes testing settings, to prevent cheating or answer-sharing.
    // The sequencing should also allow for simplified code, since a separate page is not required
    // for each question.
//
// - Players have 30 seconds to answer each question. This requires a countdown timer
// that is also displayed for the User. If the User does not submit an answer before time expires,
// The answer will be logged as "incorrect."

// - 


$(document).ready(function() {
// Scoring
    // We will need variables to store the rolling number of 
    // correct, incorrect, and unanswered (timed-out) questions
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
                text: "Sean Connery"
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
                text: "1955"
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
                text: "criminal"
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
                text: "Rick Springfield"
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
    var waitTime;

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
        }
    }

    var getQuestion = function() {
        
        // resets the question timer and starts the clock
        number=16;
        gameTimer();

        $("#answerButtons").empty();
        var htmlQuestion = "<h3>Question #" +questionBank[questionNumber].number + ": " + questionBank[questionNumber].questionText + "</h3>";
        document.querySelector("#questionText").innerHTML = htmlQuestion;
               

        // ANSWER SHUFFLER 
        // A sequence that will randomize the answer choices 
        // so not all correct answers are in the same place in each set of buttons
        // Create an empty array
        var randomArray = [];
        var notRandomArray = [1,2,3,4];
        // run a loop to generate a random sequence of numbers from 1-4
        var randomize = function () {
            for (var r = 0; randomArray.length<4; r++) {
                var random = Math.floor((Math.random() * notRandomArray.length) + 1);
                if (randomArray.indexOf(random)===-1) {
                    randomArray.push(random);
                }
                else {
                    randomize();
                }
            }
        }
        randomize();

        // the following variable, "selector", is part of the randomization attempt, 
        // but was removed from steps 4 & 5 below, because the result only pulled 
        // 3 of the 4 random buttons.

        var selector = 0;
        // *** BUTTON CREATION AND CONTENT POPULATION: ***
        // 1. Create a for-loop to iterate through the answer choices array.
        for (var i = 0; i < questionBank[questionNumber].answers.length; i++) {

            // 2. Create a variable named "answerBtn" equal to $("<button>");
            var answerBtn = $("<button>");
            
            // 3. Then give each "answerBtn" the following classes: "answer-button" "answer-text" "answer-button-color".
            answerBtn.addClass("answer-button answer-text answer-button-color");
           
            // 4. Then give each "answerBtn" a data-attribute called "data-choice".
            answerBtn.attr("data-choice", questionBank[questionNumber].answers[i]);
            
            // 5. Then give each "answerBtn" a text equal to "questionBank[questionNumber].answers[i]".
            answerBtn.text(questionBank[questionNumber].answers[i]);
            
            // 6. Finally, append each "answerBtn" to the "#buttons" div (provided).
            $("#answerButtons").append(answerBtn);
            selector++
        }

        // *** BUTTON RESPONSE AND ANSWER EVALUATION: ***
        $(".answer-button").on("click", function() {
            stop();
            evaluate($(this).attr("data-choice"));
        })    
    }
    
    // comparing user answer to correct answer
    var evaluate = function(userChoice) {
        if (userChoice===questionBank[questionNumber].correctAnswer.text) {
            console.log("you're right!");
            $("#questionText").html("<h4>Yes, '" + questionBank[questionNumber].correctAnswer.text + "' is correct! Great Job! </h4>")
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




    // Evaluation

    // General notes:
    // We may need to use the "body onload = ' ' " to call functions
    // Note the demo video made a point that the pages did not RELOAD when restarting the quiz.
})