window.onload = async function() {

    let pac_id = sessionStorage.getItem("pac_id");



    let paciente = await $.ajax({
        url: "/api/paciente",
        method: "get",
        dataType: "json"
    });

    alert(JSON.stringify(paciente));
    document.getElementById("peso").innerHTML = pac_peso;
   
    let html = "";
}
