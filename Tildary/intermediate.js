let scoreDay1 = 0;
let scoreDay2 = 0;
let totalScore = 0;

$(document).ready(function () {

    let scoreDay1 = 0;
let scoreDay2 = 0;
let totalScore = 0;

    
    let dictionary = {
        1: [
            { word: "Жібек", meaning: "өте бағалы мата түрі." },
            { word: "Ару", meaning: "сұлу, көрікті қыз." },
            { word: "Ғашық", meaning: "біреуді қатты сүю." },
        ],
        2: [
            { word: "Ұстамды", meaning: "сабырлы, өзін-өзі ұстай білетін адам" },
            { word: "Сөзге шешен", meaning: "әдемі, әсерлі сөйлей алатын адам." },
            { word: "Қатал дәстүрлер", meaning: "қатаң, өзгермейтін әдет-ғұрыптар" },
        ]
        
    };// Ерініп тұрмын, главное есть же

    
    function loadDictionary(day) {
        let wordCarousel = $("#wordCarousel .carousel-inner");
        wordCarousel.empty();

        if (dictionary[day]) {
            dictionary[day].forEach((entry, index) => {
                let activeClass = index === 0 ? "active" : "";
                let card = `
                    <div class="carousel-item ${activeClass}">
                        <div class="card p-3 text-center">
                            <h5 class="word-title">${entry.word}</h5>
                            <p class="word-meaning">${entry.meaning}</p>
                        </div>
                    </div>
                `;
                wordCarousel.append(card);
            });
        }
    }

   
    $(".day-link").click(function (e) {
        e.preventDefault();
        let dayId = $(this).attr("href").replace("#lesson-", "");
        $(".lesson-container").hide();
        $(`#lesson-${dayId}`).fadeIn(300);
        loadDictionary(dayId);
    });

    
    $(".lesson-container").hide();
    $("#lesson-1").show();
    loadDictionary(1);


   
    let quizData = {
        day1: [
            { question: "1. Төлеген кімнің баласы?", options: ["Базарбай", "Қарабай", "Құнанбай"], answer: "Базарбай" },
            { question: "2. Төлеген не іздеді?", options: ["Байлық", "Махаббат", "Билік"], answer: "Махаббат" },
            { question: "3. Қыз Жібек қайда тұрады?", options: ["Қалада", "Ауылда", "Шөлде"], answer: "Ауылда" },
            { question: "4. Төлеген Қыз Жібекке қалай ғашық болды?", options: ["Досы арқылы", "Әкесінің айтуымен", "Бір көргеннен"], answer: "Бір көргеннен" },
            { question: "5. Төлеген Қыз Жібекпен не үшін кездесті?", options: ["Сауда жасау үшін", "Үйлену үшін", "Дос болу үшін"], answer: "Үйлену үшін" }
        ],
        day2: [
            { question: "1. Батыр Баян кім болған?", options: ["Қазақ батыры", "Қытай генералы", "Ресей патшасы"], answer: "Қазақ батыры" },
            { question: "2. Батыр Баянның інісінің есімі кім?", options: ["Ержан", "Ноян", "Сырым"], answer: "Ноян" },
            { question: "3. Батыр Баян кімге қарсы соғысты?", options: ["Қалмақтар", "Орыстар", "Парсылар"], answer: "Қалмақтар" },
            { question: "4. Батыр Баян қандай қателік жасады?", options: ["Әскерін тастап кетті", "Інісін өлтірді", "Қалмақтарға қосылды"], answer: "Інісін өлтірді" },
            { question: "5. Ақыры Батыр Баянның тағдыры қалай аяқталды?", options: ["Бақытты өмір сүрді", "Қаза тапты", "Жауларға қосылды"], answer: "Қаза тапты" }
        ]
    };    //ТУТ ДОПОЛНИТЬ!!!!!!!!

    function loadQuiz(day) {
    let quizContainer = $(`#quiz-${day}`);
    let questionElement = quizContainer.find(".quiz-question");
    let optionsContainer = quizContainer.find(".quiz-options");
    let resultElement = $(`#task-container-${day} .task-result`);

    let questions = quizData[day];
    let currentQuestionIndex = 0;
    let score = 0;

    function showNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            let questionData = questions[currentQuestionIndex];
            questionElement.text(questionData.question);
            optionsContainer.empty();

            questionData.options.forEach(option => {
                let optionHtml = `
                    <label class="quiz-option">
                        <input type="radio" name="quiz-${day}" value="${option}">
                        ${option}
                    </label><br>
                `;
                optionsContainer.append(optionHtml);
            });

            optionsContainer.find("input").off("change").on("change", function () {
                let selectedAnswer = $("input[name='quiz-" + day + "']:checked").val();
                if (selectedAnswer === questions[currentQuestionIndex].answer) {
                    score++;
                }
                currentQuestionIndex++;
                setTimeout(showNextQuestion, 500);
            });
        } else {
            if (day === "day1") {
                scoreDay1 = score;
            } else if (day === "day2") {
                scoreDay2 = score;
            }

            resultElement.html(`<h4>🏆 Сіздің нәтижеңіз: ${score}/${questions.length} дұрыс жауап!</h4>`);
            checkTotalScore();
        }
    }

    showNextQuestion();
}


    
    Object.keys(quizData).forEach(day => {
        if (quizData[day]) {
            loadQuiz(day);
        }
    });

    
    let trueFalseData = {
        day1: [
            { question: "1. Төлеген Қарабайдың баласы.", answer: "Жалған" },
            { question: "2. Төлеген Қыз Жібекті бір көргеннен ұнатты.", answer: "Шын" },
            { question: "3. Төлеген байлық үшін үйленгісі келді.", answer: "Жалған" },
            { question: "4. Қыз Жібек Төлегенді жақсы көрмеді.", answer: "Жалған" },
            { question: "5. Төлеген Қыз Жібекке үйленуді армандады.", answer: "Шын" }
        ],
        day2: [
            { question: "1. Батыр Баян қалмақтарға көмектесті.", answer: "Жалған" },
            { question: "2. Ноян Батыр Баянның інісі.", answer: "Шын" },
            { question: "3. Батыр Баян орыс патшасына қызмет етті.", answer: "Жалған" },
            { question: "4. Батыр Баян өз інісін өлтірді.", answer: "Шын" },
            { question: "5. Батыр Баян өмірінің соңында тыныштықта өмір сүрді.", answer: "Жалған" }
        ]
    };   // ДОПОЛНИТЬ!!!!!!!!!!!

    function loadTrueFalseQuiz(day) {
    let quizContainer = $(`#true-false-quiz-${day}`);
    let questionElement = quizContainer.find(".true-false-question");
    let resultElement = $(`#true-false-container-${day} .true-false-result`);
    let btns = $(`#true-false-container-${day} .true-false-btn`);

    let currentQuestionIndex = 0;
    let score = 0;
    let questions = trueFalseData[day];

    function showNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            let questionData = questions[currentQuestionIndex];
            questionElement.text(questionData.question);
            btns.prop("disabled", false); // Активируем кнопки
            btns.removeClass("selected");
        } else {
            if (day === "day1") {
                scoreDay1 = score;
            } else if (day === "day2") {
                scoreDay2 = score;
            }

            resultElement.html(`<h4>🏆 Сіздің нәтижеңіз: ${score}/${questions.length} дұрыс жауап!</h4>`);
            quizContainer.hide();
            btns.prop("disabled", true);
            checkTotalScore();
        }
    }

    btns.off("click").on("click", function () {
        btns.removeClass("selected");
        $(this).addClass("selected");

        let userAnswer = $(this).attr("data-answer");
        if (userAnswer === questions[currentQuestionIndex].answer) {
            score++;
        }

        currentQuestionIndex++;
        setTimeout(showNextQuestion, 500);
    });

    showNextQuestion();
}

    
    Object.keys(trueFalseData).forEach(day => {
        if (trueFalseData[day]) {
            loadTrueFalseQuiz(day);
        }
    });

    
    function checkTotalScore() {     //ҚАТЕ РЕТТЕУ КЕРЕК
        totalScore = scoreDay1 + scoreDay2;

        
        if (totalScore >= 8) {
            $("#day-unlock-message-day1").text("🎉 Ура, новый день открыт!").css("color", "green");
        } else {
            $("#day-unlock-message-day1").text("❌ К сожалению, нужно больше баллов для открытия следующего дня черт.").css("color", "red");
        }
    }

    
    $(document).on("click", ".check-day-btn", function () {
        checkTotalScore();
    });


});                  //ҚАТЕ РЕТТЕУ КЕРЕК


$(document).on("click", ".check-writing-btn", function () {
    let day = $(this).data("day");
    let userText = $(`#user-text-${day}`).val().trim(); 

    let wordCount = userText.split(/\s+/).filter(word => word.length > 0).length;
    let resultElement = $(`#writing-result-${day}`); 

    
    if (wordCount >= 75) {
        resultElement.text(`✅ Жауабыңыз қабылданды! Сөз саны: ${wordCount}`).css("color", "green");
    } else {
        resultElement.text(`❌ Жауап тым қысқа! Сөз саны: ${wordCount}. Кемінде 75 сөз керек.`).css("color", "red");
    }

    
    $(this).hide();
    $(`#user-text-${day}`).hide();
});



