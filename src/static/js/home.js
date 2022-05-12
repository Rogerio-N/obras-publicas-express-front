let searchAttempts = 0;
const userData = getUserData();

function userDataShow(){
    document.getElementById("Name-desktop").placeholder =userData.Content[0].nome;
    document.getElementById("Email-desktop").placeholder = userData.Content[0].email;

    document.getElementById("Name-cellphone").placeholder =  userData.Content[0].nome;
    document.getElementById("Email-cellphone").placeholder = userData.Content[0].email;
}

userDataShow();

function complaintInsert(){
    let rawData = get(`${API_URL}/complaints/find/all/${userData.Content[0].id}`,token);
    let allUserComplaint = JSON.parse(rawData);
    if(allUserComplaint.Status != 200){
        sessionStorage.setItem("QtdComplaint",0)
        return alert(allUserComplaint.Content[0].Mensagem)
    }

    let table = document.getElementById("History-table");
    var qtdComplaint = 0;

    allUserComplaint.Content.forEach(complaint => {
        
        let row = document.createElement("tr");
        row.className = "allUserComplaint";
        row.id = complaint.id;

        let dateSend = document.createElement("td");
        let dataSendPrep = new Date(complaint.datadenuncia);
        let fullSendDate = `${dataSendPrep.getDate()}/${dataSendPrep.getMonth()}/${dataSendPrep.getFullYear()}`;
        dateSend.innerHTML = fullSendDate;


        let protocol = document.createElement("td");
        protocol.innerHTML =complaint.id;

        let org = document.createElement("td");
        org.innerHTML = "SISEP"

        let dateEnd = document.createElement("td");
        let dataEndPrep = new Date(complaint.datafinalizacao);
        let fullEndDate = `${dataEndPrep.getDate()}/${dataEndPrep.getMonth()}/${dataEndPrep.getFullYear()}`;
        dateEnd.innerHTML = fullEndDate;

        let status = document.createElement("td");
        status.innerHTML = complaint.status;

        row.appendChild(dateSend);
        row.appendChild(protocol);
        row.appendChild(org);
        row.appendChild(dateEnd);
        row.appendChild(status);

        table.appendChild(row);

        qtdComplaint++;

        sessionStorage.setItem("QtdComplaint", qtdComplaint);
        
    });
    
    document.getElementById("Complaint-user-count").placeholder = sessionStorage.getItem("QtdComplaint");
    document.getElementById("Complaint-counter-text").innerHTML = sessionStorage.getItem("QtdComplaint");
    document.getElementById("Complaint-Mobile-counter").placeholder = sessionStorage.getItem("QtdComplaint");
    
}

complaintInsert();

function cleanQuery(){
    let search = document.getElementsByClassName("currentComplaint");
    for(let i = 0; i<search.length;i++){
        search[i].style.display = "none";
    }

    let oldDivs = document.getElementsByClassName("allUserComplaint");

        for(let i = 0; i<oldDivs.length;i++){
            oldDivs[i].style.display = "table-row";
        }
    
}

function searchComplaint(){
    
    let currentComplaintProtocol = document.getElementById("Protocol-text-inpt").value;
    //Campo vazio
    if(currentComplaintProtocol.trim() == ""){return alert('Preencha o campo para realizar a busca')};
    waitSearch(searchAttempts,5);
    searchAttempts++;
    if(searchAttempts>=6){return searchAttempts = 0;}
    let rawData = get(`${API_URL}/complaints/find/one/${userData.Content[0].id}/${currentComplaintProtocol}`,token);
    //Nenhuma denuncia
    let Complaint = JSON.parse(rawData);
    if (Complaint.Status!=200){return alert(Complaint.Content[0].Mensagem)}
    cleanQuery();
    let table = document.getElementById("History-table");
    let oldDivs = document.getElementsByClassName("allUserComplaint");

    for(let i = 0; i<oldDivs.length;i++){
        oldDivs[i].style.display = "none";
    }
    
    let row = document.createElement("tr");
    row.className = "currentComplaint";
    let dateSend = document.createElement("td");
    let dataSendPrep = new Date(Complaint.Content[0].datadenuncia);
    let fullSendDate = `${dataSendPrep.getDate()}/${dataSendPrep.getMonth()}/${dataSendPrep.getFullYear()}`;
    dateSend.innerHTML = fullSendDate;

    let protocol = document.createElement("td");
    protocol.innerHTML = Complaint.Content[0].id;

    let org = document.createElement("td");
    org.innerHTML = "SISEP"

    let dateEnd = document.createElement("td");
    let dataEndPrep = new Date(Complaint.Content[0].datafinalizacao);
    let fullEndDate = `${dataEndPrep.getDate()}/${dataEndPrep.getMonth()}/${dataEndPrep.getFullYear()}`;
    dateEnd.innerHTML = fullEndDate;

    let status = document.createElement("td");
    status.innerHTML = Complaint.Content[0].status;

    row.appendChild(dateSend);
    row.appendChild(protocol);
    row.appendChild(org);
    row.appendChild(dateEnd);
    row.appendChild(status);

    table.appendChild(row);
}