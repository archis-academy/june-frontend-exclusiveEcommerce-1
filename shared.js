const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();

            const userList = JSON.parse(localStorage.getItem('userList')) || [];
            const loggedUserIndex = userList.findIndex(user => user.isLogin === true);

            if (loggedUserIndex !== -1) {
                userList[loggedUserIndex].isLogin = false;
                localStorage.setItem("userList", JSON.stringify(userList));
                alert("Çıkış yapıldı!");
                window.location.href = "/login.html";
            }
        });
    }