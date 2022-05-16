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
        return report.Time.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    document.querySelector('#log').innerHTML = '';
    
    // const summary = document.createElement('p');
    // summary.textContent = `Wrote on ${d}`
    // document.querySelector('#log').appendChild(summary);

    filterReports.forEach(function(report){
        // const d = new Date()
    //     const summary = document.createElement('p');
    // summary.textContent = `Wrote on: ${d}`
    // document.querySelector('#log').appendChild(summary)
    // localStorage.setItem('date', JSON.stringify(d))
        const p = document.createElement('p');
        //   ${d} <br> <br>
        p.innerHTML = `<div id="result">Wrote on: ${report.Time} <br> <br> Shift: ${report.Shift}, Period: ${report.Period}, Duty: ${report.Duty} <br> Log: ${report.Report}</div>`
        document.querySelector('#log').appendChild(p)
    })
}

renderReports(reports, filters)

// const time = function(){
//     const d = new Date()
//         const summary = document.createElement('p');
//     summary.innerHTML = `<div id="time" value="${d}">${d}</div>`
//     document.querySelector('#logTime').appendChild(summary)
    
// }

document.querySelector('#new-report').addEventListener('submit', function (e) {
    e.preventDefault()
    const d = new Date()
        const summary = document.createElement('p');
    summary.textContent = `Wrote on:${d}`
    document.querySelector('#logTime').appendChild(summary)
    reports.push({
        Time: d,
        Shift: e.target.elements.shift.value,
        Period: e.target.elements.period.value,
        Duty: e.target.elements.duty.value,
        Report: e.target.elements.report.value,
        
    })
    localStorage.setItem('reports', JSON.stringify(reports))
    renderReports(reports, filters)
    e.target.elements.report.value = ''
    
})

const reload = function(){
    location.reload();
}

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderReports(reports, filters)
})
// $(document).ready(function() {
// $("#search-text2").on("keyup", function(){
//     let value = $(this).val();
//     $("#log").each(function(records){
//       if(records !== -1){
//         let id=$(this).find("#duty").text();
//       if(id.indexOf(value)!==0 && id.toLowerCase().indexOf(value.toLowerCase())<0){
//         $(this).hide();
//       } else {
//         $(this).show();
//       }
//       }
      
//     })
//   })
// })