function put(url,data,token){
    let request = new XMLHttpRequest();
    request.open("PUT",url,true);
    request.setRequestHeader("x-access-token",token);
    request.send(JSON.stringify(data));
    return request.responseText;
}

function updateData(){
    event.preventDefault();

    let newName = document.getElementById("namee").value;
    let newEmail = document.getElementById("emaill").value;
    
    let password = document.getElementById("senhaa").value;
    let confPassword = document.getElementById("confsenhaa").value;

    let load = document.getElementById('load-handler');
    if(password != confPassword){return alert("As senhas não coincidem")}

    let userData = getUserData().Content[0];

    const data = {
        "nome":newName,
        "email":newEmail,
        "senha":password,
        "role": userData.role
    }
    load.style.display = "block";
    let userDataRequest = put(`${API_URL}/users/update/all/${userData.id}`,data,token);
    userDataRequest = JSON.parse(userDataRequest);
    if(userDataRequest.Status != 200){
        return alert(userDataRequest.Content[0].Menssagem)
    }
}