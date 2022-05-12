function redirect(){
    window.location.href = "/";
}

function createUser(){
    event.preventDefault();
    let url = `${API_URL}/users/create`;
    let email = document.getElementById("emaill").value;
    let name = document.getElementById("namee").value;
    var load = document.getElementById("load-handler");
    
    let password = document.getElementById("senhaa").value;
    let repeatPassword = document.getElementById("confsenhaa").value;

    let canCreate = false;

    if(password == repeatPassword){
        canCreate = true;
    }else{
        canCreate = false;
    }

    if(!canCreate){
        return alert("Verifique as informações e as insira novamente");
    }
    
    dados={
        "email":email,
        "senha": password,
        "nome":name,
        "role": "common"
    }
    
    load.style.display = "block";
    let userCreation = post(url,dados);
    userCreation = JSON.parse(userCreation)
    if(userCreation.Status != 200){
        load.style.display = "none";
        return alert(userCreation.Content[0].Mensagem)
    }
    redirect("/")
}