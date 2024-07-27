
    const form=document.getElementById("login-form");

    form.addEventListener("submit",(e)=>{

    e.preventDefault(); 

    const email = document.getElementById('login-text').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const loginButton = document.getElementById('log-in');

     // email veya şifre kısmı boş mu kontrol eder
     if(email===" " || password===" " ){
        loginButton.disabled=true;   
    }

    if(!email.includes('@') || !email.includes('.com')){
       alert("Lütfen doğru formatta e-posta adresi giriniz !");
       return;
  }

    const userList = JSON.parse(localStorage.getItem('userList')) || [];

    //hesabın kayıtlı olup olmadığını kontrol eder
    const userIndex = userList.findIndex(user => user.mail === email && user.password === password);
        if (userIndex === -1) {
            alert("Hesap bulunamadı. Lütfen kayıt olunuz !");
            
        }else{
            userList[userIndex].isLogin = true;
            localStorage.setItem("userList", JSON.stringify(userList));
            alert("Giriş Başarılı!");
            window.location.href = "/index.html";
        }


});






  