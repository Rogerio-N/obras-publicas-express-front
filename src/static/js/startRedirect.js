function loginRedirect(){
    let isLoged = sessionStorage.getItem("isLoged");
    
    if(isLoged == "True"){
        window.location.href = "/home";
    }else{
        window.location.href = "/";
    }
}