let tipocancro;
let tipotratamento;
let medicacao;


window.onload = async function () {

    let data = await $.ajax({
        url: "/api/npaciente",
        method: "post",
        dataType: "json"
    })

    tipocancro = data.tipocancro;
    tipotratamento = data.tipotratamento;
    medicacao = data.medicacao;

    let patSelect = document.getElementById('pat');
    let tratSelect = document.getElementById('trat');
    let medSelect = document.getElementById('med');

    for (const ele of data.tipotratamento) {
        let doc = document.createElement('option')
        doc.innerHTML = ele.diag
        tratSelect.appendChild(doc)
    }

    for (const ele of data.tipocancro) {
        let doc = document.createElement('option')
        doc.innerHTML = ele.diag
        patSelect.appendChild(doc)
    }

    for (const ele of data.medicacao) {
        let doc = document.createElement('option')
        doc.innerHTML = ele.nome
        medSelect.appendChild(doc)
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