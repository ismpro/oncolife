window.onload = async function () {

    let data = await $.ajax({
        url: "/api/pacientes",
        method: "post",
        dataType: "json"
    })
    let table = document.getElementById('table')

    if (data && Array.isArray(data) && data.length > 0) {

        for (const element of data) {
            let tr = document.createElement("tr");
            let tdNome = document.createElement("td");
            let tdSexo = document.createElement("td");
            let tdPatolagia = document.createElement("td");
            let tdTratamentos = document.createElement("td");
            let tdMedicacao = document.createElement("td");

            tdNome.innerHTML = element.nome;
            if (element.sexo === 'F') {
                tdSexo.innerHTML = 'Feminino'
            } else {
                tdSexo.innerHTML = 'Masculino'
            }
            console.log(element)
            let htmlPat = ''
            element.patologia.forEach(function (pat, index) {
                if (index > 0) {
                    htmlPat += `<div class="divider"></div> <p> ${pat}</p>`
                } else {
                    htmlPat += `<p>${pat}</p>`
                }
            });
            let htmlTrat = ''
            element.tratamento.forEach(function (trat, index) {
                if (index > 0) {
                    htmlTrat += `<div class="divider"></div> <p> ${trat}</p>`
                } else {
                    htmlTrat += `<p>${trat}</p>`
                }
            });
            let htmlMed = ''
            element.medicacao.forEach(function (med, index) {
                if (index > 0) {
                    htmlMed += `<div class="divider"></div> <p> ${med}</p>`
                } else {
                    htmlMed += `<p>${med}</p>`
                }
            });
            tdPatolagia.innerHTML = htmlPat;
            tdTratamentos.innerHTML = htmlTrat;
            tdMedicacao.innerHTML = htmlMed;

            tr.appendChild(tdNome);
            tr.appendChild(tdSexo);
            tr.appendChild(tdPatolagia);
            tr.appendChild(tdTratamentos);
            tr.appendChild(tdMedicacao);
            tr.onclick = gotoPaciente(element.id);
            table.appendChild(tr);
        }

    } else {
        console.warn('Data invalid or 0 length')
    }
}

function gotoPaciente(id) {
    return function () {
        window.location.replace(window.location.origin + '/paciente/' + id);
    }
}