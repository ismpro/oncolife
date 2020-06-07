window.onload = async function () {

    //https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
    var search = location.search.substring(1);
    let query = JSON.parse('{"' + decodeURI(search).replace('%40', '@').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')

    console.log(query)

    let data = await $.ajax({
        url: "/api/grading/" + query.utilizador,
        method: "post",
        dataType: "json"
    });

    console.log(data)

    sessionStorage.setItem('id', data.id.toString());

    document.getElementById('id').innerHTML = data.id ? data.id : 'Não tem'
    document.getElementById('nome').innerHTML = data.nome ? data.nome : 'Não tem'
    document.getElementById('tipo').innerHTML = data.tipo ? data.tipo : 'Não tem'
    document.getElementById('est').innerHTML = data.est ? data.est : 'Não tem'
    document.getElementById('hosp').innerHTML = data.hospital ? data.hospital : 'Não tem'
    document.getElementById('email').innerHTML = data.email ? data.email : 'Não tem'
    document.getElementById('tel').innerHTML = data.num_telm ? data.num_telm : 'Não tem'
    document.getElementById('morada').innerHTML = data.morada ? data.morada : 'Não tem'
    document.getElementById('med').innerHTML = data.medico ? data.medico : 'Não tem'
    document.getElementById('dtnc').innerHTML = data.dnsc ? formatDate(data.dnsc) : 'Não tem'
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