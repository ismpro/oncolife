window.onload = async function () {

    let id = sessionStorage.getItem('id')

    let data = await $.ajax({
        url: `/api/user/${id}/sistomas`,
        method: "post",
        dataType: "json"
    })

    console.log(data)

    let table = document.getElementById('table')

    if (data && Array.isArray(data) && data.length > 0) {

        for (const element of data) {
            let tr = document.createElement("tr");
            let tdData = document.createElement("td");
            let tdHora = document.createElement("td");
            let tdSintomas = document.createElement("td");

            tdData.innerHTML = element.data ? formatDate(element.data) : 'Não tem';
            tdHora.innerHTML = element.hora ? element.hora : 'Não tem';;

            let html = ''
            element.sistomas.forEach(function (sis, index) {
                if (index > 0) {
                    html += `< div class= "divider" ></div><p>${sis}</p>`
                } else {
                    html += `<p>${sis}</p>`
                }
            });

            tdSintomas.innerHTML = html;
            tr.appendChild(tdData);
            tr.appendChild(tdHora);
            tr.appendChild(tdSintomas);
            table.appendChild(tr);
        }

    } else {
        console.warn('Data invalid or 0 length')
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    console.log(d.getTime())

    if (isNaN(d.getTime()))
        return '0000-00-00'

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
};