function submit(e) {
    e.preventDefault();

    let utilizador = document.getElementById('utilizador').value;
    let password = document.getElementById('utilizador').value;

    let data = await $.ajax({
        url: "/api/login",
        method: "post",
        dataType: "json",
        data: JSON.stringify({ utilizaor: utilizador, password: password })
    });

    if (data) {
        
    }
}