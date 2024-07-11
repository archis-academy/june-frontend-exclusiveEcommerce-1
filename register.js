const registerForm=document.getElementById("register-form");
   
    registerForm.addEventListener("submit",(e)=>{
        e.preventDefault(); 
        //elementler seçildi
        const fullname=document.getElementById("register-fullname").value.trim();
        const mail=document.getElementById("register-text").value.trim();
        const password=document.getElementById("register-password").value.trim();


         //inputların boş olup olmadığını kontrol eder
            if(fullname===" " || mail===" " || password===" "){
                loginButton.disabled=true;
            }
        
        // e-postanın doğru formatta olup olmadığını kontrol eder
        if(!mail.includes('@') || !mail.includes('.com')){
              alert("Lütfen doğru formatta e-posta adresi giriniz !");
              return;
        }

        const userList = JSON.parse(localStorage.getItem("userList")) || [];

        const emailExists = userList.some(user => user.mail === mail);
        if (emailExists) {
            alert("Bu e-posta kayıtlı.Lütfen farklı e-posta ile tekrar deneyiniz !");
            
        }else{
            const newUser = { fullname, mail, password, isLogin:null };
            userList.push(newUser);
        
            localStorage.setItem("userList", JSON.stringify(userList));
            alert("Kayıt Oluşturuldu.");
            window.location.href = '/login.html';
        }
        
    });

   
        
  

