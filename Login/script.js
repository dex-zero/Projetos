function login(){
    var name = $('#user').val();
    var password = $('#password').val();

    if(name && password && name === "admin" && password === "admin"){
        const user = {
            name,
            entryDate: dataAtualFormatada(new Date()),
            Id: Math.floor(Math.random() * 100000)
        }

        localStorage.setItem("user", JSON.stringify(user))
        window.location.href = "../Store";
        console.log("deu boa")
    }else{
        document.getElementById("error-modal").style.display = "flex"
        document.getElementById("user").style.display = "2px solid red"
        document.getElementById("password").style.display = "2px solid red"
    }

    function closeError(){
        document.getElementById("error-modal").style.display = "flex"
        document.getElementById("user").style.display = "2px solid lightpink"
        document.getElementById("password").style.display = "2px solid lightpink"
    }
    
    function showPassword(){
        var inputPassword = document.querySelector('#password')
        
        if(inputPassword.getAttribute("type") === "password"){
            inputPassword.setAttribute("type", "text")
        }else{
            inputPassword.setAttribute("type", "password")

        }
    }
    function dataAtualFormatada(){
        var data = new Date(),
            dia  = data.getDate().toString().padStart(2, '0'),
            mes  = (data.getMonth()+1).toString().padStart(2, '0'),
            ano  = data.getFullYear();
        return dia+"/"+mes+"/"+ano;
    }
    
}