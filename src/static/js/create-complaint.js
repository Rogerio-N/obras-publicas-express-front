var imgurResponse;

let base64String = "";

function imageUploaded() {
    var file = document.querySelector('input[type=file]')['files'][0];
    
    var reader = new FileReader();
    
    reader.onload = function () {
        base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    }
    reader.readAsDataURL(file);
}

function createComplaint(){
    event.preventDefault();
    
    let complaintType = document.getElementById("Type-selector").value;
    let loader = document.getElementById("load-handler");
    if(complaintType == 0){return alert("Por favor selecione um tema de denuncia")}
            
    let cep = document.getElementById("CEP").value;
    let street = document.getElementById("Street").value;
    let neighborhood = document.getElementById("neighborhood").value;
    let addressNumber = parseInt(document.getElementById("input-number-adress").value);
    let description = document.getElementById("Complaint-description").value;
    addressNumber = parseInt(addressNumber);

    let sendDate = new Date();
    let endDate = new Date();
    
    let endMonth = (sendDate.getMonth()+1);
    endDate.setMonth(endMonth);
    const imgurData = {
        "image": base64String,
        "type": "base64"
    }
    loader.style.display = "block";
    imgurResponse = postImgur("https://api.imgur.com/3/image",imgurData,"805bdac1a4e7b95");
    imgurResponse = JSON.parse(imgurResponse)
    if(!imgurResponse.success){
        alert("Algo deu errado, por favor tente novamente mais tarde")
        return redirect("/home")
    }
    let imgLink = imgurResponse.data.link
    let currentUser = userData.Content[0].id;
    const complaintData = {
        "idTheme": parseInt(complaintType),
        "status": "Aguardando resposta",
        "descricao": description,
        "numero": addressNumber,
        "rua": street,
        "bairro": neighborhood,
        "dataDenuncia": sendDate,
        "dataFinalizacao": endDate,
        "cep":cep,
        "idUser": currentUser,
        "imageUrl": imgLink
    }

    let sendComplaintRaw = sendComplaint(`${API_URL}/complaints/create`,complaintData);
    sendComplaintRaw = JSON.parse(sendComplaintRaw)
    if(sendComplaintRaw.Status != 200){return alert(sendComplaintRaw.Content[0].Mensagem)}
    redirect('/home')
    
}  

const userData = getUserData();
        
function userDataShow(){
    document.getElementById("Name-desktop").placeholder =userData.Content[0].nome;
    document.getElementById("Email-desktop").placeholder = userData.Content[0].email;

    document.getElementById("Name-cellphone").placeholder =  userData.Content[0].nome;
    document.getElementById("Email-cellphone").placeholder = userData.Content[0].email;

    document.getElementById("Complaint-counter-desktop").placeholder = sessionStorage.getItem("QtdComplaint");
    document.getElementById("Complaint-counter-cellphone").placeholder = sessionStorage.getItem("QtdComplaint");
}

function insertThemes(){
    
    let themeSelector = document.getElementById("Type-selector");

    let allThemes = getThemes(`${API_URL}/themes/find/active/true`);
    allThemes = JSON.parse(allThemes)

    allThemes.Content.forEach(theme => {
        let themeId = theme.id;
        
        let themeName = theme.nome
        let themeHolder = document.createElement("option")
        themeHolder.innerHTML = themeName;
        themeHolder.value = themeId;

        themeSelector.appendChild(themeHolder);
    });
}

insertThemes();

userDataShow();