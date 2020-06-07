let sistomas;

window.onload = async function () {

    let data = await $.ajax({
        url: "/api/sistomas",
        method: "post",
        dataType: "json"
    })

    sistomas = data;

    let sintomas = document.getElementById('sintomas');

    for (const ele of sistomas) {
        let doc = document.createElement('option')
        doc.innerHTML = ele.nome
        sintomas.appendChild(doc)
    }
}

function novoPaciente(e) {
    e.preventDefault();

    let nome = document.getElementById('fname').value;
    let gender;
    if (document.getElementById('feminino').checked) {
        gender = 'F'
    } else if (document.getElementById('masculino').checked) {
        gender = 'M'
    } else {
        gender = 'O'
    }

    let pat = document.getElementById('pat').value;
    let trat = document.getElementById('trat').value;
    let med = document.getElementById('med').value;

    pat = tipocancro.find(function (ele) { return pat === ele.diag })
    trat = tipotratamento.find(function (ele) { return trat === ele.diag })
    med = medicacao.find(function (ele) { return med === ele.nome })

    if (pat && trat && med && nome && gender) {
        $.ajax({
            url: "/api/npaciente/create",
            method: "post",
            dataType: "json",
            data: JSON.stringify({
                nome, gender, pat, trat, med
            })
        }).then((data) => {
            if (data) {
                window.location.replace(window.location.origin + '/paciente.html')
            }
        })
    } else {
        console.log('no novo paciente')
    }
}