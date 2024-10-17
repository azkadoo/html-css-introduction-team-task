$(document).ready(function () {
    const currentPage = window.location.pathname.split('/').pop();

    // Modular Functions
    function updateCharacterCounter($inputElement, $counterElement, maxLength) {
        $inputElement.on('input', function () {
            const currentLength = $inputElement.val().length;
            $counterElement.text(`${currentLength}/${maxLength}`);
        });
    }

    function validatePassword(selector, minLength, errorMessage) {
        const password = $(selector).val();
        if (password.length < minLength) {
            alert(errorMessage);
            return false;
        }
        return true;
    }

    // Login & Signup Page
    if (currentPage === 'login.html') {
        // Setup Login Counters
        updateCharacterCounter($('#login-email'), $('#login-email-counter'), 30);
        updateCharacterCounter($('#login-password'), $('#login-password-counter'), 10);

        // Setup Sign-up Counters
        updateCharacterCounter($('#username'), $('#username-counter'), 20);
        updateCharacterCounter($('#email-signup'), $('#email-signup-counter'), 30);
        updateCharacterCounter($('#password-signup'), $('#password-signup-counter'), 10);

        // Form Submission Handling
        $('#form-login').on('submit', function () {
            return validatePassword('#login-password', 8, 'Password login harus minimal 8 karakter!');
        });

        $('#form-signup').on('submit', function () {
            return validatePassword('#password-signup', 8, 'Password harus minimal 8 karakter!');
        });
        
        // Toggle between Login and Sign-Up
        $('#sign-up-btn').on('click', function () {
            $('.container').addClass('sign-up-mode');
        });

        $('#sign-in-btn').on('click', function () {
            $('.container').removeClass('sign-up-mode');
        });
    }

    // Index Page
    if (currentPage === 'index.html') {
        // Scroll to Top Button
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('#scrollToTopBtn').fadeIn(); 
            } else {
                $('#scrollToTopBtn').fadeOut();
            }
        });

        $('#scrollToTopBtn').click(function() {
            $('html, body').animate({scrollTop: 0}, 10);
        });

        // Carousel Auto Slide
        let autoSlide = setInterval(() => {
            $('#carouselExampleIndicators').carousel('next');
        }, 3000);

        $('.carousel-control-next, .carousel-control-prev').click(function() {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => $('#carouselExampleIndicators').carousel('next'), 3000);
        });

        // Dark Mode
        const themeSwitch = $("#theme-switch");
        const darkmode = localStorage.getItem("darkmode");

        if (darkmode === "active") {
            $("body").addClass("darkmode");
        }

        themeSwitch.on("click", function() {
            $("body").toggleClass("darkmode");
            localStorage.setItem("darkmode", $("body").hasClass("darkmode") ? "active" : "inactive");
        });
    }

    // Game Page
    if (currentPage === "game.html") {
        
        // Timer 
        let remainingTime = 60;
        const levelText = $(".level").text();

        const updateLevelText = () => {
            $(".level").text(`${levelText} - Waktu Tersisa: ${remainingTime}s`);
        };

        updateLevelText();
        
        const intervalTimer = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                updateLevelText();
            } else {
                clearInterval(intervalTimer);
                alert("Waktu habis! Anda akan diarahkan ke beranda");
                window.location.href = "index.html";
            }
        }, 1000);
    }

    if (currentPage === "mabar.html") {
        const storyText = $('#story-text');
        const approveBtn = $('#approve-btn');
        const changeBtn = $('<button class="btn btn-outline-secondary ms-2" id="edit-btn">Ubah</button>');
        const saveBtn = $('<button class="btn btn-outline-secondary ms-2" id="save-btn">Simpan</button>');
        const approvalStatus = $('<p class="me-3">3 orang udah setuju!</p>');
    
        // Tambahkan tombol ubah di sebelah kanan tombol setuju
        approveBtn.after(changeBtn);
    
        // Tambahkan keterangan setuju di sebelah kiri tombol setuju
        approveBtn.before(approvalStatus);
    
        // Event untuk tombol ubah (mengubah <p> menjadi <input>)
        changeBtn.on('click', function () {
            const currentText = storyText.text();
            const inputField = $('<input type="text" class="form-control mt-2" id="story-input">').val(currentText);
            storyText.replaceWith(inputField);
            changeBtn.hide();
            approveBtn.after(saveBtn);
        });
    
        // Event untuk tombol simpan (mengubah kembali <input> menjadi <p>)
        saveBtn.on('click', function () {
            const newText = $('#story-input').val();
            const newStoryText = $('<p id="story-text" class="mt-2"></p>').text(newText);
            $('#story-input').replaceWith(newStoryText);
            saveBtn.remove();
            changeBtn.show();
        });
    
        // Event untuk tombol setuju (mengubah "Setuju" menjadi "Selesaikan")
        approveBtn.on('click', function () {
            approveBtn.text('Selesaikan');
            // Tambahkan logika untuk menyelesaikan cerita
            alert('Cerita sudah selesai. Terima kasih!');
        });
    }
});
