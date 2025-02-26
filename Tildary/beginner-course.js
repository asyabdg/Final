

$(document).ready(function () {


     setupQuizWithSteps("day1");
    setupQuizWithSteps("day2");
    setupQuizWithSteps("day3");
    setupQuizWithSteps("day4");
    setupQuizWithSteps("day5");
    setupQuizWithSteps("day6");
    setupQuizWithSteps("day7");
   
    

    $(".day-link").click(function (e) {
        e.preventDefault(); // Отменяем стандартный переход по якорю
        
        let targetDay = $(this).attr("href"); // Получаем ID нужного дня (например, #lesson-2)

        // Скрываем все дни
        $(".lesson-container").hide();

        // Показываем выбранный день
        $(targetDay).fadeIn(300);
    });

    //  1. Словарь для каждого дня
    let dictionary = {
        1: [
            { word: "А", meaning: "Буква А" },
            { word: "Ә", meaning: "Буква Ә" },
            { word: "Б", meaning: "Буква Б" },
            { word: "В", meaning: "Буква В" },
            { word: "Г", meaning: "Буква Г" },
            { word: "Ғ", meaning: "Буква Ғ" },
            { word: "Д", meaning: "Буква Д" },
            { word: "Е", meaning: "Буква Е" },
            { word: "Ж", meaning: "Буква Ж" },
            { word: "З", meaning: "Буква З" }
        ],
        2: [
            { word: "Сәлем", meaning: "Привет" },
            { word: "Қалайсың?", meaning: "Как дела?" },
            { word: "Сау бол", meaning: "До свидания" },
            { word: "Кешіріңіз", meaning: "Извините" },
            { word: "Рахмет", meaning: "Спасибо" },
            { word: "Қош келдіңіз", meaning: "Добро пожаловать" },
            { word: "Көріскенше", meaning: "До встречи" },
            { word: "Аман-есен", meaning: "Будьте здоровы" },
            { word: "Жақсы", meaning: "Хорошо" },
            { word: "Жаман", meaning: "Плохо" }
        ],
        3: [
            { word: "Мен", meaning: "Я" },
            { word: "Сен", meaning: "Ты" },
            { word: "Ол", meaning: "Он/она" },
            { word: "Біз", meaning: "Мы" },
            { word: "Сіз", meaning: "Вы" },
            { word: "Олар", meaning: "Они" },
            { word: "Дос", meaning: "Друг" },
            { word: "Ана", meaning: "Мама" },
            { word: "Әке", meaning: "Папа" },
            { word: "Ағай", meaning: "Дядя" }
        ],
        4: [
            { word: "Кітап", meaning: "Книга" },
            { word: "Қала", meaning: "Город" },
            { word: "Ауыл", meaning: "Деревня" },
            { word: "Үй", meaning: "Дом" },
            { word: "Мектеп", meaning: "Школа" },
            { word: "Жұмыс", meaning: "Работа" },
            { word: "Қазақ", meaning: "Казах" },
            { word: "Орыс", meaning: "Русский" },
            { word: "Күн", meaning: "Солнце" },
            { word: "Ай", meaning: "Луна" }
        ],
        5: [
            { word: "Қалам", meaning: "Ручка" },
            { word: "Қағаз", meaning: "Бумага" },
            { word: "Тақта", meaning: "Доска" },
            { word: "Карта", meaning: "Карта" },
            { word: "Сабақ", meaning: "Урок" },
            { word: "Мұғалім", meaning: "Учитель" },
            { word: "Оқушы", meaning: "Ученик" },
            { word: "Сынып", meaning: "Класс" },
            { word: "Жаттығу", meaning: "Упражнение" },
            { word: "Баға", meaning: "Оценка" }
            ],
        6: [
            { word: "Сөз", meaning: "Слово" },
            { word: "Сөйлем", meaning: "Предложение" },
            { word: "Диалог", meaning: "Диалог" },
            { word: "Қарым-қатынас", meaning: "Общение" },
            { word: "Хат", meaning: "Письмо" },
            { word: "Дауыстап оқу", meaning: "Чтение вслух" },
            { word: "Жазу", meaning: "Письмо (процесс)" },
            { word: "Қарым-қатынас жасау", meaning: "Взаимодействие" },
            { word: "Аударма", meaning: "Перевод" },
            { word: "Тіл", meaning: "Язык" }
            ],
        7: [
            { word: "Қайталау", meaning: "Повторение" },
            { word: "Тест", meaning: "Тест" },
            { word: "Қорытынды", meaning: "Итог" },
            { word: "Сертификат", meaning: "Сертификат" },
            { word: "Қорытынды тест", meaning: "Финальный тест" },
            { word: "Бағалау", meaning: "Оценивание" },
            { word: "Нәтиже", meaning: "Результат" },
            { word: "Түйін", meaning: "Вывод" },
            { word: "Жетістік", meaning: "Достижение" },
            { word: "Қорытындылау", meaning: "Подведение итогов" }
            ]
        };

            //  2. Функция загрузки словаря по дню
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

            // 3. Переход по дням и обновление словаря
            $(".day-link").click(function (e) {
                e.preventDefault();
                let dayId = $(this).attr("href").replace("#lesson-", "");
                $(".lesson-container").hide();
                $(`#lesson-${dayId}`).fadeIn(300);
                loadDictionary(dayId);
            });

            // 4. При загрузке показываем первый день и его словарь
            $(".lesson-container").hide();
            $("#lesson-1").show();
            loadDictionary(1);

});

            //Задания
    // 1-задание
const wordsByDay = {
        1: [
            { kazakh: "мысық", translation: "кот" },
            { kazakh: "ит", translation: "собака" },
            { kazakh: "күн", translation: "солнце" },
            { kazakh: "ай", translation: "луна" },
            { kazakh: "аспан", translation: "небо" }
        ],
        2: [
            { kazakh: "су", translation: "вода" },
            { kazakh: "от", translation: "огонь" },
            { kazakh: "жел", translation: "ветер" },
            { kazakh: "жер", translation: "земля" },
            { kazakh: "ауа", translation: "воздух" }
        ],
        3: [
            { kazakh: "үй", translation: "дом" },
            { kazakh: "есік", translation: "дверь" },
            { kazakh: "терезе", translation: "окно" },
            { kazakh: "қабырға", translation: "стена" },
            { kazakh: "төбе", translation: "потолок" }
        ],
        4: [
            { kazakh: "нан", translation: "хлеб" },
            { kazakh: "ет", translation: "мясо" },
            { kazakh: "айран", translation: "кефир" },
            { kazakh: "су", translation: "вода" },
            { kazakh: "шай", translation: "чай" }
        ],
        5: [
            { kazakh: "ана", translation: "мама" },
            { kazakh: "әке", translation: "папа" },
            { kazakh: "аға", translation: "брат" },
            { kazakh: "апа", translation: "сестра" },
            { kazakh: "дос", translation: "друг" }
        ],
        6: [
            { kazakh: "бір", translation: "один" },
            { kazakh: "екі", translation: "два" },
            { kazakh: "үш", translation: "три" },
            { kazakh: "төрт", translation: "четыре" },
            { kazakh: "бес", translation: "пять" }
        ]
    };

     function loadTask1(day) {
        const words = wordsByDay[day]; 
        if (!words) return; // 

        let currentWordIndex = 0; 
        let score = 0; 



        // Функция обновления слова
        function updateWord() {
            if (currentWordIndex < words.length) {
                $("#kazakh-word-day" + day).text(words[currentWordIndex].kazakh);
                $("#word-counter-day" + day).text(currentWordIndex + 1);
                $("#user-answer-day" + day).val(""); 
                $("#task1-result-day" + day).text(""); 
            } else {
                // Если слова закончились, показать результат
                $("#task1-result-day" + day).html(`✅ Вы набрали <strong>${score}/${words.length}</strong> баллов!`);
                $("#submitTask1-day" + day).prop("disabled", true); 
            }
        }

        // Функция проверки ответа
        $("#submitTask1-day" + day).click(function () {
            if (currentWordIndex >= words.length) return; 

            let userAnswer = $("#user-answer-day" + day).val().trim().toLowerCase(); 
            let correctAnswer = words[currentWordIndex].translation.toLowerCase();

            if (userAnswer === correctAnswer) {
                score++; 
                $("#task1-result-day" + day).text("✅ Правильно!");
            } else {
                $("#task1-result-day" + day).html(`❌ Ошибка! Правильный ответ: <strong>${correctAnswer}</strong>`);
            }

            currentWordIndex++; 
            setTimeout(updateWord, 1000); 
        });

        updateWord(); // Загружаем первое слово
    }

    // 📌 Запускаем задание 1 при загрузке дня
    for (let i = 1; i <= 7; i++) {
        if ($("#lesson-" + i).length) {
            loadTask1(i);
        }
    }

   


      // 2-задание
let quizData = {
    day1: [
        { question: "Какая буква лишняя в казахском алфавите?", options: ["Ё", "Ә", "Қ"], answer: "Ё" },
        { question: "Сколько букв в казахском алфавите?", options: ["42", "33", "29"], answer: "29" },
        { question: "Какой буквы нет в казахском алфавите?", options: ["Й", "В", "Ө"], answer: "В" },
        { question: "Какой буквы нет в русском алфавите, но есть в казахском?", options: ["Қ", "К", "Г"], answer: "Қ" },
        { question: "Как пишется звук 'ч' в казахском языке?", options: ["Ч", "Ш", "Ж"], answer: "Ш" }
    ],
    day2: [
        { question: "Как сказать 'Привет' на казахском?", options: ["Сау бол!", "Сәлем!", "Қош келдіңіз!"], answer: "Сәлем!" },
        { question: "Как вежливо поприветствовать старшего?", options: ["Сәлем!", "Ассалаумағалейкум!", "Қош келдіңіз!"], answer: "Ассалаумағалейкум!" },
        { question: "Что значит 'Сау бол'?", options: ["Привет!", "Пока!", "Спасибо!"], answer: "Пока!" },
        { question: "Как сказать 'Добрый день'?", options: ["Қайырлы күн!", "Сау бол!", "Қош келдіңіз!"], answer: "Қайырлы күн!" },
        { question: "Что значит 'Қош келдіңіз'?", options: ["Добро пожаловать!", "До свидания!", "Как дела?"], answer: "Добро пожаловать!" }
    ],
    day3: [
        { question: "Как сказать 'Как дела?' на казахском?", options: ["Сенің атың кім?", "Қалың қалай?", "Менің атым ..."], answer: "Қалың қалай?" },
        { question: "Как ответить на 'Қалың қалай?'?", options: ["Жақсы!", "Сенің атың кім?", "Қош келдің!"], answer: "Жақсы!" },
        { question: "Как сказать 'Меня зовут ...'?", options: ["Менің атым ...", "Қош келдің!", "Сау бол!"], answer: "Менің атым ..." },
        { question: "Что значит 'Рақмет'?", options: ["Пожалуйста", "Спасибо", "Добро пожаловать"], answer: "Спасибо" },
        { question: "Как сказать 'Пожалуйста'?", options: ["Сізге рақмет!", "Оқасы жоқ!", "Жақсы!"], answer: "Оқасы жоқ!" }
    ],
    day4: [
        { question: "Как сказать 'Извините' на казахском?", options: ["Кешіріңіз!", "Қош келдіңіз!", "Менің атым ..."], answer: "Кешіріңіз!" },
        { question: "Как спросить 'Где находится магазин?'?", options: ["Бұл не?", "Дүкен қайда?", "Сенің атың кім?"], answer: "Дүкен қайда?" },
        { question: "Как сказать 'Сколько это стоит?'?", options: ["Бағасы қанша?", "Менің атым ...", "Бұл не?"], answer: "Бағасы қанша?" },
        { question: "Как спросить 'Можно мне это?'?", options: ["Бұл қанша?", "Бұл мүмкін бе?", "Менікі ме?"], answer: "Бұл мүмкін бе?" },
        { question: "Как сказать 'Мне нужно ...'?", options: ["Маған керек ...", "Бұл не?", "Қайда барамыз?"], answer: "Маған керек ..." }
    ],
    day5: [
        { question: "Какой падеж в казахском языке отвечает на вопрос 'кого? чего?'", options: ["Ілік септік", "Барыс септік", "Жатыс септік"], answer: "Ілік септік" },
        { question: "Какой падеж отвечает на вопрос 'кому? к чему?'", options: ["Жатыс септік", "Барыс септік", "Шығыс септік"], answer: "Барыс септік" },
        { question: "Какое окончание у винительного падежа?", options: ["-ны/-ні", "-да/-де", "-ке/-ге"], answer: "-ны/-ні" },
        { question: "Какие суффиксы используются для отрицания?", options: ["-ма/-ме", "-ды/-ді", "-да/-де"], answer: "-ма/-ме" },
        { question: "Как правильно сказать 'я иду в школу'?", options: ["Мен мектепте барамын", "Мен мектепке барамын", "Мен мектептен барамын"], answer: "Мен мектепке барамын" }
    ],
    day6: [
        { question: "Как вежливо обратиться к незнакомцу?", options: ["Сәлем!", "Кешіріңіз!", "Маған керек ..."], answer: "Кешіріңіз!" },
        { question: "Как спросить разрешение что-то сделать?", options: ["Бұл қанша?", "Мүмкін бе?", "Рақмет!"], answer: "Мүмкін бе?" },
        { question: "Как сказать 'Будьте здоровы!'?", options: ["Сізге рақмет!", "Аман болыңыз!", "Жақсы бол!"], answer: "Аман болыңыз!" },
        { question: "Как вежливо предложить помощь?", options: ["Сізге көмектесуге бола ма?", "Кешіріңіз!", "Бұл қанша?"], answer: "Сізге көмектесуге бола ма?" },
        { question: "Как сказать 'Извините за беспокойство'?", options: ["Кешіріңіз, мазалағаным үшін!", "Рақмет!", "Оқасы жоқ!"], answer: "Кешіріңіз, мазалағаным үшін!" }
    ],
    day7: [
        { question: "Какой перевод правильный: 'Мысық'?", options: ["Собака", "Кот", "Корова"], answer: "Кот" },
        { question: "Как сказать 'До свидания'?", options: ["Қош келдіңіз!", "Сау бол!", "Жақсы бол!"], answer: "Сау бол!" },
        { question: "Как сказать 'Я иду в школу'?", options: ["Мен мектепке барамын", "Мен мектептен барамын", "Мен мектепте барамын"], answer: "Мен мектепке барамын" },
        { question: "Как сказать 'Как дела'?", options: ["Қалың қалай?", "Жақсы!", "Сізге рақмет!"], answer: "Қалың қалай?" },
        { question: "Что значит 'Рақмет'?", options: ["Пожалуйста", "Спасибо", "Как дела?"], answer: "Спасибо" }
    ]
};


//  Функция для создания теста
function setupQuizWithSteps(day) {
    let questions = quizData[day];
    let currentIndex = 0; 
    let score = 0; 

    function loadQuestion() {
        if (currentIndex < questions.length) { 
            let q = questions[currentIndex]; 
            let quizContainer = $(`#quiz-${day}`);
            quizContainer.html(""); 

            let questionHtml = `
                <div class="quiz-question">
                    <p><b>${currentIndex + 1}. ${q.question}</b></p>
                    ${q.options.map(option => `
                        <label class="quiz-option" data-value="${option}">
                            ${option}
                        </label>
                    `).join("")}
                </div>
            `;

            quizContainer.append(questionHtml);
        } else {
            $(`#quiz-${day}`).html(`✅ Отлично! ${score}/5 баллов.`);
            $("#submitTask2-day" + day).prop("disabled", true); 
        }
    }

    
    $(document).on("click", `#quiz-${day} .quiz-option`, function () {
        let selectedAnswer = $(this).attr("data-value"); 
        let correctAnswer = questions[currentIndex].answer;

        if (selectedAnswer === correctAnswer) {
            score++; 
        }

        currentIndex++; 
        setTimeout(loadQuestion, 500); 
    });

    
    loadQuestion();
}



  // 3-задание
let poemsByDay = {
    1: "Алматы – әсем қала,\nКөңілімді көтереді.",
    2: "Күн жарқырап тұр,\nЖылы самал соғып тұр.",
    3: "Қазақ тілі – ана тілім,\nОны үйрену – парызым.",
    4: "Жайлауда өскен бала,\nТабиғатты сүйеді.",
    5: "Білім – таусылмас байлық,\nКітап – сенің жолдасың.",
    6: "Ата-анаңды құрметте,\nҚұрметтесең – өркендейсің.",
    7: "Отаным – менің тұрағым,\nБақытты өмір сүремін."
};


//  Функция загрузки стиха
    function loadPoemTask(day) {
        const poem = poemsByDay[day];
        if (!poem) return; 

        $("#poem-day" + day).text(poem); 
        $("#user-poem-day" + day).val(""); 
        $("#task3-result-day" + day).text(""); 
        $("#submitTask3-day" + day).prop("disabled", false); 
    }

    //  Функция проверки стиха
    function checkPoemTask(day) {
        const correctPoem = poemsByDay[day].trim(); 
        const userPoem = $("#user-poem-day" + day).val().trim(); 

        if (!userPoem) {
            $("#task3-result-day" + day).text("❌ Введите стих перед проверкой!");
            return;
        }

        let correctWords = correctPoem.split(/\s+/); 
        let userWords = userPoem.split(/\s+/); 

        let totalWords = correctWords.length; 
        let errors = 0; 

        
        for (let i = 0; i < totalWords; i++) {
            if (correctWords[i] !== userWords[i]) {
                errors++; 
            }
        }

        
        let score = Math.max(5 - errors, 0); 

        
        if (score === 5) {
            $("#task3-result-day" + day).html(`✅ Отлично! ${score}/5 баллов.`);
        } else {
            $("#task3-result-day" + day).html(`❌ Ошибки: ${errors}. Ваш результат: ${score}/5 баллов.`);
        }

        $("#submitTask3-day" + day).prop("disabled", true); 
    }

    
    for (let i = 1; i <= 7; i++) {
        if ($("#lesson-" + i).length) {
            loadPoemTask(i);

            
            $("#submitTask3-day" + i).click(function () {
                checkPoemTask(i);
            });
        }
    }

    






    /*$(".unlock-next-day").each(function () {
        let day = $(this).data("day"); 
        checkCompletion(day); 
    });

    function checkCompletion(day) {
        let totalScore = 0;
        let maxScore = 15; 
        let completed = 0; 

        
        if ($(`#task1-result-day${day}`) {
           
        }

        if ($(`#quiz-${day}`) {
            
        }

        if ($(`#task3-result-day${day}`){
           
        }

        // Если все задания завершены
        if (completed === 3) {
            let unlockButton = $(`#unlock-day-${day}`);
            unlockButton.show(); 

            if (totalScore >= 13) {
                unlockButton.text("✅ Завершить день и открыть следующий");
            } else {
                unlockButton.text("🔄 Попробовать снова");
                unlockButton.removeClass("btn-success").addClass("btn-danger");
            }
        }
    }

    $(".unlock-next-day").click(function () {
        let nextDay = ..+ 1;
        let totalScore = 0;

        ................                                                                                    <!-- МЫНДА ӘЛІ РЕТТЕТІРУ КЕРЕК  -->

        if (totalScore >= 13) {
            // Разблокируем следующий день
            $(`#lesson-${nextDay}`).fadeIn(300);
            localStorage.setItem(`day${nextDay}-unlocked`, "true");
            $(this).text("🎉 День завершен!").prop("disabled", true);
            $(`#lesson-${day} .task-section`).hide(); 
            $(`#lesson-${day}`).append("<p class='text-success'>Вы успешно закончили этот день!</p>");
        } else {
            
          
        }
    });
























