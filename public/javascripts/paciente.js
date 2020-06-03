window.onload = async function () {

    console.log(window.location.pathname)

    let data = await $.ajax({
        url: window.location.pathname,
        method: "post",
        dataType: "json"
    })

    if (data) {
        console.log(data)

        let nome = document.getElementById('nome')
        let sexo = document.getElementById('sexo')
        let dtnc = document.getElementById('dtnc')
        let idade = document.getElementById('idade')
        let altura = document.getElementById('altura')
        let peso = document.getElementById('peso')
        let cancro = document.getElementById('cancro')
        let trat = document.getElementById('trat')


        nome.innerHTML = data.nome
        sexo.innerHTML = data.sexo === 'F' ? 'Feminino' : 'Masculino';
        dtnc.innerHTML = formatDate(data.dnsc)
        idade.innerHTML = data.idade
        peso.innerHTML = data.peso + ' kg'
        altura.innerHTML = data.altura + ' cm'
        let htmlPat = ''
        data.patologia.forEach((pat, index) => {
            htmlPat += index > 0 ? `<div class="divider"></div> <p>${pat.tipo} - ${pat.est}</p>` : `<p>${pat.tipo} - ${pat.est}</p>`
        });
        cancro.innerHTML = htmlPat
        let htmlTrat = ''
        data.tratamento.forEach((trat, index) => {
            htmlTrat += index > 0 ? `<div class="divider"></div> <p> ${trat}</p>` : `<p>${trat}</p>`
        });
        trat.innerHTML = htmlTrat

    } else {
        console.warn('Data invalid')
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
};