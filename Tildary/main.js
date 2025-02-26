//подсказки
$(document).ready(function () {
    $('[data-bs-toggle="tooltip"]').tooltip({
        placement: 'bottom', 
        customClass: 'custom-tooltip' 
    });

    console.log(localStorage.getItem('userLevel'));
});


$(document).ready(function () {
    var isProfilePage = window.location.pathname.includes("profile.html");
    var userSection = $("#userSection");
    var loginForm = $("#loginForm");
    var registerForm = $("#registerForm");
    var logoutButton = $("#logoutButton");

    // из входа в регистрацию)
    $("#showRegisterModal").click(function () {
        $("#loginModal").modal("hide");
        setTimeout(function () {
            $("#registerModal").modal("show");
        }, 300);
    });

    function getUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    }

    function userExists(email) {
        return getUsers().some(function (user) {
            return user.email === email;
        });
    }

    function addUser(name, email, password) {
        var users = getUsers();
        users.push({ name: name, email: email, password: password });
        localStorage.setItem("users", JSON.stringify(users));
    }

    function updateUserButton() {
        var currentUserEmail = localStorage.getItem("currentUserEmail");
        if (currentUserEmail) {
            var users = getUsers();
            var user = users.find(function (u) { return u.email === currentUserEmail; });
            if (user) {
                userSection.text(user.name);
                userSection.off("click").on("click", function () {
                    window.location.href = "profile.html";
                });
            }
        } else {
            userSection.text("Личный кабинет");
            if (!isProfilePage) {
                userSection.off("click").on("click", function () {
                    $("#loginModal").modal("show");
                });
            }
        }
    }

    loginForm.submit(function (event) {
        event.preventDefault();
        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();
        var users = getUsers();
        var user = users.find(function (u) { return u.email === email && u.password === password; });

        if (user) {
            localStorage.setItem("currentUserEmail", email);
            window.location.href = "profile.html";
        } 
        else {
            alert("Неверный email или пароль!");
        }
    });

    function getUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    }

    function userExists(email) {
        var users = getUsers();
        return users.some(function (user) { return user.email === email; }); 
    }

    function addUser(name, email, password) {
        var users = getUsers();
        users.push({ id: email, name: name, email: email, password: password }); 
        localStorage.setItem("users", JSON.stringify(users));
    }


    $("#logoutButton").click(function () {
        localStorage.removeItem("currentUserEmail");
        window.location.href = "main.html";
    });
});




$(document).ready(function () {
    var searchInput = $("#bookSearch");
    var bookItems = $(".book-item");

    searchInput.on("input", function () {
        var searchText = searchInput.val().toLowerCase().trim(); 

        bookItems.each(function () {
            var bookTitle = $(this).find("a").text().toLowerCase(); 
            if (bookTitle.includes(searchText)) {
                $(this).show(); 
            } else {
                $(this).hide();
            }
        });
    });
});




$(document).ready(function () {
    var reviewForm = $("#reviewForm");
    var reviewText = $("#reviewText");
    var reviewContainer = $("#reviews");
    var stars = $(".star");
    var selectedRating = 0;

    
    function getCurrentUser() {
        return localStorage.getItem("currentUserEmail");
    }

   
    function loadReviews() {
        reviewContainer.html("");
        var reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        $.each(reviews, function (index, review) {
            var reviewElement = "<div class='review'>" +
                "<p><strong>" + review.user + "</strong></p>" +
                "<p>" + review.text + "</p>" +
                "<p>Оценка: " + "⭐".repeat(review.rating) + "</p>" +
                "</div>";
            reviewContainer.append(reviewElement);
        });
    }

   
    reviewForm.on("submit", function (e) {
        e.preventDefault();

        var reviewValue = reviewText.val().trim();
        var currentUser = getCurrentUser();

        if (!currentUser) {
            alert("Вы должны войти в систему, чтобы оставить отзыв!");
            return;
        }

        if (reviewValue === "" || selectedRating === 0) {
            alert("Пожалуйста, напишите отзыв и выберите оценку!");
            return;
        }

        var reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push({ user: currentUser, text: reviewValue, rating: selectedRating });
        localStorage.setItem("reviews", JSON.stringify(reviews));

        reviewText.val(""); 
        selectedRating = 0;
        stars.removeClass("selected"); 

        loadReviews(); // Перезагружаем отзывы
    });

    
    stars.on("click", function () {
        selectedRating = parseInt($(this).attr("data-value"));
        stars.removeClass("selected");
        for (var i = 0; i < selectedRating; i++) {
            $(stars[i]).addClass("selected");
        }
    });

    loadReviews(); 
});




$(document).ready(function () {
    var isProfilePage = window.location.pathname.includes("profile.html");
    var userSection = $("#userSection");
    var loginForm = $("#loginForm");
    var registerForm = $("#registerForm");
    var logoutButton = $("#logoutButton");
    var leftSidebar = $("#leftSidebar");
    var rightSidebar = $("#rightSidebar");
    var toggleLeft = $("#toggleLeftSidebar");
    var toggleRight = $("#toggleRightSidebar");

    
    $("#showRegisterModal").click(function () {
        $("#loginModal").modal("hide");
        setTimeout(function () {
            $("#registerModal").modal("show");
        }, 300);
    });

    function getUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    }

    function userExists(email) {
        return getUsers().some(function (user) {
            return user.email === email;
        });
    }

    function addUser(name, email, password) {
        var users = getUsers();
        users.push({ name: name, email: email, password: password });
        localStorage.setItem("users", JSON.stringify(users));
    }

    function updateUserButton() {
        var currentUserEmail = localStorage.getItem("currentUserEmail");
        if (currentUserEmail) {
            var users = getUsers();
            var user = users.find(function (u) { return u.email === currentUserEmail; });
            if (user) {
                userSection.text(user.name);
                userSection.off("click").on("click", function () {
                    window.location.href = "profile.html";
                });
            }
        } else {
            userSection.text("Личный кабинет");
            if (!isProfilePage) {
                userSection.off("click").on("click", function () {
                    $("#loginModal").modal("show");
                });
            }
        }
    }

    loginForm.submit(function (event) {
        event.preventDefault();
        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();
        var users = getUsers();
        var user = users.find(function (u) { return u.email === email && u.password === password; });

        if (user) {
            localStorage.setItem("currentUserEmail", email);
            window.location.href = "profile.html";
        } else {
            alert("Неверный email или пароль!");
        }
    });

    registerForm.submit(function (event) {
        event.preventDefault();
        var name = $("#registerName").val();
        var email = $("#registerEmail").val();
        var password = $("#registerPassword").val();

        if (password.length < 6) {
            alert("Пароль должен быть не менее 6 символов!");
            return;
        }

        if (userExists(email)) {
            alert("Этот email уже зарегистрирован!");
            return;
        }

        addUser(name, email, password);
        localStorage.setItem("currentUserEmail", email);
        window.location.href = "profile.html";
    });

    updateUserButton();

    logoutButton.click(function () {
        localStorage.removeItem("currentUserEmail");
        window.location.href = "main.html";
    });

    function toggleSidebar(sidebar) {
        if (!sidebar.hasClass("sidebar-open")) {
            sidebar.show();
            setTimeout(function () { sidebar.addClass("sidebar-open"); }, 10);
        } else {
            sidebar.removeClass("sidebar-open");
        }
    }

    toggleLeft.on("click", function (event) {
        event.stopPropagation();
        toggleSidebar(leftSidebar);
    });

    toggleRight.on("click", function (event) {
        event.stopPropagation();
        toggleSidebar(rightSidebar);
    });

    $(".accordion-button").on("click", function () {
        setTimeout(function () {
            leftSidebar.show();
            rightSidebar.show();
        }, 300);
    });

    $(document).on("click", function (event) {
        if (!leftSidebar.is(event.target) && leftSidebar.has(event.target).length === 0 && !toggleLeft.is(event.target)) {
            leftSidebar.removeClass("sidebar-open");
        }
        if (!rightSidebar.is(event.target) && rightSidebar.has(event.target).length === 0 && !toggleRight.is(event.target)) {
            rightSidebar.removeClass("sidebar-open");
        }
    });
});



$(document).ready(function () {
    var quotes = [
        "Өзіңе сен, жеңеріңе сен!",
        "Білім – ең мықты қару.",
        "Талаптыға нұр жауар.",
        "Черт болма",
        "Бірлік түбі – тірлік.",
        "Ақыл азбайды, білім тозбайды."
    ];

    var quoteDisplay = $("#quoteDisplay");
    var currentIndex = localStorage.getItem("quoteIndex");

    if (currentIndex === null || currentIndex >= quotes.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }

    quoteDisplay.text(quotes[currentIndex]);
    localStorage.setItem("quoteIndex", currentIndex);
});




