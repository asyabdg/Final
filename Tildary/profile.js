function getCurrentUser() {
    return localStorage.getItem("currentUserEmail");
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function updateProfileButton() {
    let currentUser = getCurrentUser();
    const profileMenu = document.getElementById("profileMenu");

    if (currentUser && profileMenu) {
        let users = getUsers();
        let user = users.find(u => u.email === currentUser);
        if (user) {
            profileMenu.textContent = user.name; 
        } else {
            profileMenu.textContent = "Личный кабинет"; 
        }
    }
}

function updateUserInfo() {
    let userLevel = localStorage.getItem("userLevel");

    if (!userLevel) return; // Если тест не пройден, не загружаем данные

    let userName = getName() || "Неизвестно";
    let userEmail = localStorage.getItem("currentUserEmail") || "Нет email";
    let studyDays = localStorage.getItem("studyDays") || 0;
    let lessonsCompleted = localStorage.getItem("lessonsCompleted") || 0;
    let totalLessons = 10;
    let progress = Math.round((lessonsCompleted / totalLessons) * 100);

    $("#userNameDisplay").text(userName);
    $("#userEmailDisplay").text(userEmail);
    $("#userLevelDisplay").text(userLevel);
    $("#studyDays").text(studyDays);
    $("#lessonsCompleted").text(`${lessonsCompleted}/${totalLessons}`);
    $("#courseProgress").text(`${progress}%`);

    // Определяем следующее задание
    if (lessonsCompleted >= totalLessons) {
        $("#nextLesson").text("🎉 Курс завершён! Поздравляем!");
    } else {
        $("#nextLesson").text(`📖 Следующий урок: Урок ${lessonsCompleted + 1}`);
    }

    // Генерируем случайную мотивационную цитату
    let motivationQuotes = [
        "Білім – ең мықты қару.",
        "Еңбек етсең ерінбей, тояды қарның тіленбей.",
        "Ақыл, қайрат, жүректі бірдей ұста.",
        "Ғылым таппай мақтанба!",
        "Білімді мыңды жығар, білекті бірді жығар."
    ];
    let randomQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
    $("#motivationQuote").text(`💡 ${randomQuote}`);
}

function updateProfileUI() {
    let userLevel = localStorage.getItem("userLevel");

    if (!userLevel) return;

    // Заполняем данные
    $("#userLevelDisplay").text(userLevel);
    $("#courseTitle").text(`Ваш курс (${userLevel})`);
    $("#courseDescription").text("Теперь у вас есть доступ к урокам!");

    // Разблокируем первый урок
    $(".lesson-card").each(function (index) {
        if (index === 0) {
            $(this).removeClass("locked").find("p").text("Доступно ✅");
        } else {
            $(this).find("p").text("🔒 Доступно позже");
        }
    });

    $("#testButton").hide(); 

    $(".lesson-card.locked").each(function() {
    $(this).css("position", "relative") 
           .append("<style>.lesson-card.locked::after { content: none !important; }</style>");


});

}

function getName() {
    let users = JSON.parse(localStorage.getItem('users'));
    let currentUser = getCurrentUser();

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === currentUser) {
            return users[i].name;
        }
    }

    return;
}

$("#registerForm").submit(function (event) {
    event.preventDefault();
    
    var name = $("#registerName").val().trim();
    var email = $("#registerEmail").val().trim();
    var password = $("#registerPassword").val();

    if (password.length < 6) {
        alert("Пароль должен быть не менее 6 символов!");
        return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];
    var emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
        alert("Этот email уже зарегистрирован!");
        return;
    }

   
    users.push({ name: name, email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    
    localStorage.removeItem("userLevel"); 

    window.location.href = "profile.html";
});



$(document).ready( function() {
    updateProfileButton();

    $("#exit").click(function (event) {
        event.preventDefault();
        localStorage.removeItem("currentUserEmail");
        localStorage.removeItem("userLevel");
        updateProfileButton(); 
        window.location.href = "main.html";
    });


    let currentQuestionIndex = 0;
    let userAnswers = [];

   
    const questions = [
       
        {
            text: "Как перевести 'Привет'?",
            options: ["Сәлем", "Қош келдіңіз", "Рахмет", "Сау бол"],
            correct: 0
        },
        {
            text: "Что означает 'Менің атым ...' ?",
            options: ["Как дела?", "Меня зовут ...", "Добро пожаловать", "До свидания"],
            correct: 1
        },
        {
            text: "Какая буква отсутствует в казахском алфавите?",
            options: ["Ә", "И", "Ё", "Ө"],
            correct: 2
        },
        {
            text: "Как сказать 'Спасибо' по-казахски?",
            options: ["Көрдің бе", "Рахмет", "Келіңіз", "Дос"],
            correct: 1
        },
        {
            text: "Какой цвет обозначает 'Көк'?",
            options: ["Синий", "Красный", "Жёлтый", "Белый"],
            correct: 0
        },

        {
            text: "Мәтіннің негізгі ойы қандай? ", 
            textId: "text1",
            options: ["Қазақ халқының табиғатқа деген құрметі", "Табиғатты зерттеудің маңызы", "Орман-тоғайлардың саны", "Қазақ халқының өмір салты"],
            correct: 0
        },
        {
            text: "'Киелі' сөзінің мағынасы қандай?", 
            textId: "text1",
            options: ["Қасиетті, маңызды", "Қауіпті, қорқынышты", "Жай, қарапайым", "Өтпелі, уақытша"],
            correct: 0
        },
        {
            text: "Мәтіндегі 'құндылық' сөзіне синонимді табыңыз.", 
            textId: "text1",
            options: ["Дәстүр", "Бағалы нәрсе", "Қиындық", "Зерттеу"],
            correct: 1
        },
        {
            text: "Автор қандай ойды жеткізгісі келеді?",
            textId: "text1",
            options: ["Қазақ халқы табиғатты ерекше құрметтеген.", "Орман-тоғайлар адам өміріне зиян.", "Қазақ халқының тұрмысы қиын болған.", "Өзен-көлдер тек шаруашылық үшін қажет."],
            correct: 0
        },
        {
            text: "Мәтінге ең жақын мақал-мәтел қандай?", 
            textId: "text1",
            options: ["'Туған жер – алтын бесік.'", "'Білекті бірді жығар, білімді мыңды жығар.'", "'Кітап – білім бұлағы.'", "'Еңбек түбі – береке.'"],
            correct: 0
        },

        {
            text: "'Ғылым таппай мақтанба' өлеңінің негізгі мағынасы қандай?",
            options: ["Ғылымсыз мақтану дұрыс емес", "Оқу әрдайым қиын", "Адам мақтануы керек", "Ғылым – тек мұғалімдерге қажет"],
            correct: 0
        },
        {
            text: "'Ақыл, қайрат, жүректі бірдей ұста' жолындағы қасиеттер қандай?",
            options: ["Ақыл, күш және жүрек", "Байлық, бақыт, мансап", "Оқу, ойын, демалыс", "Сұлулық, мінез, күш"],
            correct: 0
        },
        {
            text: "Абайдың қандай шығармасы ұлт болашағына арналған?",
            options: ["Қара сөздер", "Абай жолы", "Байғанин поэзиясы", "Мұқағали Мақатаев өлеңдері"],
            correct: 0
        },
        {
            text: "Қазақ эпосының негізгі жанры қандай?",
            options: ["Поэзия", "Тарихи роман", "Легенда", "Драма"],
            correct: 2
        },
        {
            text: "Абай поэзиясының негізгі идеясы қандай?",
            options: ["Білім мен еңбекті бағалау", "Қуаныш – өмірдің мәні", "Саясат – ең маңызды нәрсе", "Шығармашылық – адам бақыты"],
            correct: 0
        }
    ];

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            console.log(10000);
            finishTest();
            return;
        }

        let question = questions[currentQuestionIndex];

       
        $("#questionText").html(question.text);

       
        $("#readingTextContent").empty();
        if (question.textId) {
            $("#readingTextContent").append($(`#${question.textId}`).html());
            $("#readingText").show();
        } else {
            $("#readingText").hide();
        }

       
        $("#answerOptions").empty();
        $.each(question.options, function (index, option) {
            let btn = $("<button>")
                .addClass("btn btn-outline-dark w-100")
                .text(option)
                .click(function () {
                    selectAnswer(index);
                });

            $("#answerOptions").append(btn);
        });
    }

    $("#testButton").click(function () {
        console.log("Кнопка теста нажата, загружаем первый вопрос...");
        loadQuestion();
    });

    
    function selectAnswer(answerIndex) {
        userAnswers.push(answerIndex === questions[currentQuestionIndex].correct);
        currentQuestionIndex++;
        loadQuestion();
    }

    
    function finishTest() {
        let correctAnswers = userAnswers.filter(ans => ans).length;
        let userLevel = "Начинающий";
    
        if (correctAnswers > 5) userLevel = "Орташа";
        if (correctAnswers > 10) userLevel = "Эксперт";
    
        localStorage.setItem("userLevel", userLevel); 
        $("#userLevelText").text(`Ваш уровень: ${userLevel}`);
    
      
        $("#testButton").hide();
        $("#testModal").modal("hide");
    
        setTimeout(function () {
            $("#resultModal").modal("show"); 
            updateProfileUI(); 
            updateButtonLink(userLevel); 
        }, 500);
    }

        $(document).ready(function() {
        let userLevel = localStorage.getItem("userLevel");

       
        if (!userLevel) {
            $("#startCourseButton").prop("disabled", true).text("Пройдите тест");
        } else {
            updateButtonLink(userLevel); 
        }
    });

  
    function updateButtonLink(level) {
        let link = "#"; // По умолчанию заглушка
        if (level === "Начинающий") link = "beginner-course.html";
        if (level === "Орташа") link = "intermediate-course.html";
        if (level === "Эксперт") link = "expert-course.html";

        $("#startCourseButton")
            .prop("disabled", false) // Активируем кнопку
            .attr("href", link) // Устанавливаем ссылку
            .text("Перейти к курсу");


    }


    let userLevel = localStorage.getItem("userLevel");
    console.log(userLevel);

    if (!userLevel) {
        console.log("Тест не пройден, оставляем страницу пустой");
        
        
        $("#courseTitle").text("Пройдите тест, чтобы открыть курсы");
        $("#courseDescription").text("Пройдите тест, чтобы получить доступ к урокам.");

        
        $("#userLevelDisplay").text("Не определён");
        $("#userNameDisplay").text("");
        $("#userEmailDisplay").text("");
        $("#studyDays").text("");
        $("#lessonsCompleted").text("");
        $("#courseProgress").text("");

        
        $("#testButton").show();

    } else {
        
        updateProfileUI();
    }

    updateUserInfo();





});





$(document).ready(function () {
    // Проверка авторизации
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    if (!currentUserEmail) {
        window.location.href = "main.html";
    }

    // Инициализация всплывающих подсказок
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Получение данных пользователя
    function getUserData(email) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        return users.find(user => user.email === email) || {};
    }

    let userData = getUserData(currentUserEmail);

    $("#userNameDisplay").text(userData.name || "Неизвестно");
    $("#userEmailDisplay").text(userData.email || "Неизвестно");
    $("#userLevelDisplay").text(userData.level || "Не определён");
    $("#studyDays").text(userData.studyDays || 0);
    $("#lessonsCompleted").text(`${userData.lessonsCompleted || 0}/10`);
    $("#courseProgress").text(`${userData.progress || 0}%`);

    // Сохранение настроек профиля
    $("#saveSettings").click(function () {
        const newUsername = $("#newUsername").val();
        const newPassword = $("#newPassword").val();

        if (newUsername) {
            userData.name = newUsername;
            $("#userNameDisplay").text(newUsername);
        }

        if (newPassword) {
            alert("Пароль успешно изменён! (На сервере он должен обновляться через API)");
        }

        localStorage.setItem("users", JSON.stringify([...JSON.parse(localStorage.getItem("users")) || [], userData]));
        alert("Настройки сохранены!");
    });

    // Выход из аккаунта
    $("#exit").click(function () {
        localStorage.removeItem("currentUserEmail");
        window.location.href = "main.html";
    });

    // Функция разблокировки уроков
    function updateLessonCards() {
        $(".lesson-card").each(function (index) {
            if (index < (userData.lessonsCompleted || 0)) {
                $(this).removeClass("locked").click(function () {
                    alert(`Открыт урок ${index + 1}`);
                });
            }
        });
    }
    updateLessonCards();

    // Мотивационная цитата
    const quotes = [
        "Өзіңе сен, жеңеріңе сен!",
        "Білім – ең мықты қару.",
        "Талаптыға нұр жауар.",
        "Еңбек түбі – береке.",
        "Бірлік түбі – тірлік.",
        "Ақыл азбайды, білім тозбайды."
    ];
    $("#motivationQuote").text(quotes[Math.floor(Math.random() * quotes.length)]);

    // Функция прохождения теста
    window.nextQuestion = function () {
        alert("Следующий вопрос теста (нужна логика смены вопросов)");
    };

    // Обновление уровня после теста
    function updateUserLevel(level) {
        userData.level = level;
        $("#userLevelDisplay").text(level);
        localStorage.setItem("users", JSON.stringify([...JSON.parse(localStorage.getItem("users")) || [], userData]));
    }
}); 

