const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();

    const userList = JSON.parse(localStorage.getItem("userList")) || [];
    const loggedUserIndex = userList.findIndex((user) => user.isLogin === true);

    if (loggedUserIndex !== -1) {
      userList[loggedUserIndex].isLogin = false;
      localStorage.setItem("userList", JSON.stringify(userList));
      alert("Çıkış yapıldı!");
      window.location.href = "login.html";
    }
  });
}

const Login = () => {
  const userList = JSON.parse(localStorage.getItem("userList"))  ;
  const userIsLogin = userList === null ? "" : userList.map((item) => item.isLogin);
  console.log(userIsLogin);
  if (userList === null) {
    window.location.href = "register.html";
    localStorage.setItem("userList", JSON.stringify(false));
  } else if (userIsLogin[0] === false || userIsLogin[0] === undefined) {
    window.location.href = "login.html";
  }
};

Login();