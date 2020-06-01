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
            let trSexo = document.createElement("td");
            let trPatolagia = document.createElement("td");
            let trTratamentos = document.createElement("td");
            let trMedicacao = document.createElement("td");

            tdNome.innerHTML = element.nome;
            trSexo.innerHTML = element.sexo === 'F' ? 'Feminino' : 'Masculino';
            let htmlPat = ''
            element.patologia.forEach((pat, index) => {
                htmlPat += index > 0 ? `<div class="divider"></div> <p> ${pat}</p>` : `<p>${pat}</p>`
            });

            let htmlTrat = ''
            element.tratamento.forEach((trat, index) => {
                htmlTrat += index > 0 ? `<div class="divider"></div> <p> ${trat}</p>` : `<p>${trat}</p>`
            });

            let htmlMed = ''
            element.medicacao.forEach((med, index) => {
                htmlMed += index > 0 ? `<div class="divider"></div> <p> ${med}</p>` : `<p>${med}</p>`
            });
            trPatolagia.innerHTML = htmlPat;
            trTratamentos.innerHTML = htmlTrat
            trMedicacao.innerHTML = htmlMed

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
