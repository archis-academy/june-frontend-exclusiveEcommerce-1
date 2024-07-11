const updateLogoutStatus = () => {
    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    const loggedUserIndex = userList.findIndex(user => user.isLogin === true);

    if (loggedUserIndex !== -1) {
        userList[loggedUserIndex].isLogin = false;
        localStorage.setItem("userList", JSON.stringify(userList));
    }
};

window.addEventListener("beforeunload", updateLogoutStatus);