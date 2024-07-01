

document.addEventListener('DOMContentLoaded', function() {
    const email = document.getElementById('login-text');
    const password = document.getElementById('login-password');
    const loginButton = document.getElementById('log-in');

    email.addEventListener("input", controlInput);
    password.addEventListener("input",controlInput);

    // email veya şifre kısmı boş mu kontrol
    function controlInput(){
        if(email.value.trim()==" " || password.value.trim()==" " ){
            loginButton.disabled=true;
            
        }
    }


    const form=document.getElementById("login-form");
    form.addEventListener("submit",(e)=>{
    e.preventDefault(); //formun gönderilmesini engeller

    if(email.value.includes('@gmail.com') || email.value.includes('@hotmail.com')){
          alert("Giriş Başarılı");
    }else{
        alert("Lütfen geçerli bir e-posta adresi giriniz!");
    }

});

});
