let reports = [];


const filters = {
    searchText: ''
}

const reportJSON = localStorage.getItem('reports');
if (reportJSON !== null){
    reports = JSON.parse(reportJSON)
}

const renderReports = function(reports, filters){
    const filterReports = reports.filter(function(report){
        return report.Time.toLowerCase().includes(filters.searchText.toLowerCase()) || report.Date.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    document.querySelector('#log').innerHTML = '';

    filterReports.forEach(function(report){
        const p = document.createElement('p');
        //   ${d} <br> <br>
        p.innerHTML = `<div id="result">Wrote on: ${report.Time} <hr> Report Date:${report.Date}<br> Shift: ${report.Shift} -- Period: ${report.Period} -- Duty: ${report.Duty} <br> Log: ${report.Report}</div>`
        document.querySelector('#log').appendChild(p)
    })
    
}

renderReports(reports, filters)

const renderReports2 = function(reports, filters){
    const filterReports = reports.filter(function(report){
        return report.Duty.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    document.querySelector('#log').innerHTML = '';

    filterReports.forEach(function(report){
        const p = document.createElement('p');
        //   ${d} <br> <br>
        p.innerHTML = `<div id="result">Wrote on: ${report.Time} <hr> Report Date:${report.Date} <br> Shift: ${report.Shift}  ||  Period: ${report.Period}  ||  Duty: ${report.Duty} <br> Log: ${report.Report}</div>`
        document.querySelector('#log').appendChild(p)
    })
    
}

renderReports2(reports, filters)

document.querySelector('#new-report').addEventListener('submit', function (e) {
    e.preventDefault()
    const d = moment()
    const timeStamp = moment().valueOf();

    //     const summary = document.createElement('p');
    // summary.textContent = `Wrote on:${d}`
    // document.querySelector('#logTime').appendChild(summary)
    reports.push({
        Time: d.toString(),
        Date: e.target.elements.date.value,
        Shift: e.target.elements.shift.value,
        Period: e.target.elements.period.value,
        Duty: e.target.elements.duty.value,
        Report: e.target.elements.report.value,
        createdAt: timeStamp
    })
    localStorage.setItem('reports', JSON.stringify(reports))
    renderReports(reports, filters)
    e.target.elements.report.value = ''
})

const refresh = function(){
    setTimeout(function(){
        location.reload()}, 1000)
}

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderReports(reports, filters)
})

document.querySelector('#search-text2').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderReports2(reports, filters)
})

// const sort = function(){
//     reports.sort(function(a, b){
//         if(a.createdAt > b.createdAt){
//             return -1
//         } else if(a.createdAt < b.createdAt){
//             return 1
//         } else {
//             return 0
//         }
//     })
//     renderReports(reports, filters)
// }