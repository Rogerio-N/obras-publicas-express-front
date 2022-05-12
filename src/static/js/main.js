//https://obras-publicas-prod.herokuapp.com
//https://obras-publicas-qa.herokuapp.com
//http://localhost:3000
const API_URL = "https://obras-publicas-qa.herokuapp.com";
var token = sessionStorage.getItem("Token")

if( (window.location.pathname != "/" && window.location.pathname != "/cadastro") && token == null){
    alert('Você não está logado para acessar a página')
    redirect()
}

function redirect(path = "/"){
    window.location.href = path;
}

function getUserData(){
    let userEmail = parseJwt(token).userEmail;
    
    return JSON.parse(get(`${API_URL}/users/find/email/${userEmail}`,token));
}

function parseJwt(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);

}

function post(url,data){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.send(JSON.stringify(data));
    return request.responseText;
}

function sendComplaint(url,data){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.setRequestHeader("x-access-token",`${token}`);
    request.send(JSON.stringify(data));
    return request.responseText;
}

function login(url,data){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.send(JSON.stringify(data));  
    return request.responseText;
}

function postImgur(url,data,clientId){
    let request = new XMLHttpRequest();
    request.open("POST",url,false);
    request.setRequestHeader("Content-type","application/json; charset=utf-8");
    request.setRequestHeader("Authorization","Client-ID "+clientId);
    request.send(JSON.stringify(data));
    return request.responseText;
}

function getThemes(url){
    let request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.send();
    return request.responseText;
};

function get(url,token){
    let request = new XMLHttpRequest();
    request.open("GET",url,false);
    request.setRequestHeader("x-access-token",token);
    request.send();
    return request.responseText;
};

function buttonDisable(ButtonId, disable = true){
    let button = document.getElementById(ButtonId);
    button.disabled = disable
}

function sleep(ms){
    const date = Date.now();
    let currentDate = null;
    do{
        currentDate = Date.now();
    }while(currentDate - date < ms)
}

function waitSearch(attemptVar,maxAttempts){

    if(attemptVar >= maxAttempts){
        alert("Você fez várias tentativas! Espere 5 segundos para tentar novamente")
        sleep(5000);
        return alert("Você já pode tentar novamente")
    }

}

function back(){
    event.preventDefault();
    window.history.back()
}