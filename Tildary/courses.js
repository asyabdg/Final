$(document).ready(function () {

    $("#toggleSidebar").click(function () {
            $(".courses-sidebar").toggleClass("open"); 
        });

    var userSection = $("#userSection"); 

    function updateUserButton() {
        var currentUserEmail = localStorage.getItem("currentUserEmail"); 

        if (currentUserEmail) {
           
            var users = JSON.parse(localStorage.getItem("users")) || [];
            var user = users.find(function (u) { return u.email === currentUserEmail; });

            if (user) {
                userSection.text(user.name); // Отображаем имя
                userSection.off("click").on("click", function () {
                    window.location.href = "profile.html"; 
                });
            }
        } else {
            userSection.text("Личный кабинет");
            userSection.off("click").on("click", function () {
                $("#loginModal").modal("show"); 
            });
        }
    }

   
    updateUserButton();

   
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();
        var users = JSON.parse(localStorage.getItem("users")) || [];
        var user = users.find(function (u) { return u.email === email && u.password === password; });

        if (user) {
            localStorage.setItem("currentUserEmail", email); 
            window.location.href = "courses.html"; 
        } else {
            alert("Неверный email или пароль!");
        }
    });

   
    $("#registerForm").submit(function (event) {
        event.preventDefault();
        var name = $("#registerName").val();
        var email = $("#registerEmail").val();
        var password = $("#registerPassword").val();

        if (password.length < 6) {
            alert("Пароль должен быть не менее 6 символов!");
            return;
        }

        
        var users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(function (u) { return u.email === email; })) {
            alert("Этот email уже зарегистрирован!");
            return;
        }

       
        users.push({ name: name, email: email, password: password });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email); 
        window.location.href = "courses.html"; 
    });

    
    $("#logoutButton").click(function () {
        localStorage.removeItem("currentUserEmail"); 
        window.location.href = "courses.html";
    });

    
    $(".start-course").click(function () {
        var currentUserEmail = localStorage.getItem("currentUserEmail"); 

        if (currentUserEmail) {
           
            window.location.href = "profile.html"; 
        } else {
           
            $("#loginModal").modal("show"); 
        }
    });
});
