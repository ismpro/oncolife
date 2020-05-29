window.onload = async function () {

    let data = await $.ajax({
        url: "/api/paciente",
        method: "post",
        dataType: "json"
    })
    let table = document.getElementById('table')

    if (data && Array.isArray(data) && data.length > 0) {

        for (const element of data) {
            console.log(element)
            let tr = document.createElement("tr");
            let tdNome = document.createElement("td");
            let trSexo = document.createElement("td");
            let trPatolagia = document.createElement("td");
            let trTratamentos = document.createElement("td");
            let trMedicacao = document.createElement("td");

            tdNome.innerHTML = element.pessoa.nome;
            trSexo.innerHTML = element.pessoa.sexo === 'F' ? 'Feminino' : 'Masculino';
            trPatolagia.innerHTML = 'Patologia'
            trTratamentos.innerHTML = 'Tratamento'
            trMedicacao.innerHTML = 'Medicação'

            tr.appendChild(tdNome);
            tr.appendChild(trSexo);
            tr.appendChild(trPatolagia);
            tr.appendChild(trTratamentos);
            tr.appendChild(trMedicacao);
            table.appendChild(tr);
        }

    } else {
        console.warn('Data invalid or 0 length')
    }
}
