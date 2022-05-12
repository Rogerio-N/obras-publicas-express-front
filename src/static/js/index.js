let loginAttempts = 0;
let canLogin = true;
    
function Runner(){
    
    sessionStorage.setItem("isLoged",false);
    let rawData = getThemes(`${API_URL}/themes/find/active/true`);
    let themes = JSON.parse(rawData);
    let themeDisplay = document.getElementById("Theme-display");

    themes.Content.forEach(theme => {
        
        let themeDiv = document.createElement("div");
        themeDiv.className = "Theme";

        let imgDiv = document.createElement("div");
        imgDiv.className = "imgDiv";

        let themeImg = document.createElement("img");
        themeImg.src = theme.url;

        let nameDiv = document.createElement("div");
        nameDiv.className = "nameDiv";

        let themeName = document.createElement("h3");
        themeName.innerHTML = theme.nome;

        imgDiv.appendChild(themeImg);
        nameDiv.appendChild(themeName);

        themeDiv.appendChild(imgDiv);
        themeDiv.appendChild(nameDiv);

        themeDisplay.appendChild(themeDiv);

    });   

};

Runner();

function loginChecker(){
    event.preventDefault();
    
    let currentUserMail = document.getElementById("desktop-email").value || document.getElementById("cellphone-email").value;
    let currentUserPassword = document.getElementById("desktop-password").value || document.getElementById("cellphone-password").value;

    let data = {
        "email": currentUserMail,
        "senha": currentUserPassword
    }
    waitSearch(loginAttempts, 5)
    loginAttempts ++;
    if(loginAttempts >=6){return loginAttempts = 0}
    let rawUser = login(`${API_URL}/users/login`,data);
    let user = JSON.parse(rawUser)
    if(user.Status != 200){
        return alert(user.Content[0].Mensagem)
    }
    sessionStorage.setItem("Token",user.message)
    sessionStorage.setItem("isLoged",true)
    redirect("/home");
};