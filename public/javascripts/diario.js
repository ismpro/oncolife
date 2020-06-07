let sistomas;

window.onload = async function () {

    let id = sessionStorage.getItem('id')
    console.log(id)
    if (id) {
        let data = await $.ajax({
            url: "/api/sistomas",
            method: "get",
            dataType: "json"
        })

        sistomas = data;

        console.log(data)

        let sintomas = document.getElementById('sintoma');

        for (const ele of sistomas) {
            let doc = document.createElement('option')
            doc.innerHTML = ele.nome
            sintomas.appendChild(doc)
        }
    } else {
        window.location.replace(window.location.origin)
    }
}

function novoDiario(e) {
    e.preventDefault();

    let id = sessionStorage.getItem('id')

    let data = document.getElementById('data').value;
    let time = document.getElementById('appt').value;

    let sis = document.getElementById('sis').value;

    sis = sistomas.find(function (ele) { return sis === ele.nome })

    if (id && sis && time && data) {
        $.ajax({
            url: "/api/diario/create",
            method: "post",
            dataType: "json",
            data: JSON.stringify({
                id: id,
                data: data,
                time: time,
                sis: sis
            })
        }).then((data) => {
            console.log(data)
            /* if (data) {
                window.location.replace(window.location.origin + '/sintomas.html')
            } */
        })
    } else {
        console.log('no novo diario')
    }
}