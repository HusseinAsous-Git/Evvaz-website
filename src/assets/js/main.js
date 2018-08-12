// slideInOut();
// const pieChart = document.getElementById("myPieChart");
// var CHART2 = new Chart(pieChart, {
//     type: 'pie',

//     // The data for our dataset
//     data:{
//         labels : ['Present','Absent'],
//         datasets: [
//             {
//                 label: "My Pie Points",
//                 backgroundColor: ['green','red'],
//                  borderColor: 'rgb(255, 99, 132)',
//                 data: [10,55]
//             }
//         ]
//     }

//     // Configuration options go here
//   // options: {}
// });


// var data = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [{
//         label: "My First dataset",
//         fill: false,
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         data: [0, 10, 5, 2, 20, 30, 45],
//     }]
// };
// const lineChart = document.getElementById("line-chart");
// var CHART1 = new Chart(lineChart, {
//     type: 'line',

//     // The data for our dataset
//     data: data,

//     // Configuration options go here
//     options: {}
// });

// const barChart = document.getElementById("bar-chart");
// var CHART3 = new Chart(barChart, {
//     type: 'bar',

//     // The data for our dataset
//     data: data,

//     // Configuration options go here
//     options: {}
// });

// function slideInOut() {
//     console.log("hi there")
//     let sideMenu = document.querySelector("#side-bar");
//     let slideout = document.querySelector("#out");
//     let slidein = document.querySelector("#in");
//     slidein.addEventListener("click", function (e) {
//         e.preventDefault();
//         sideMenu.classList.remove("slide-out");
//         sideMenu.classList.add("slide-in");
//     });
//     slideout.addEventListener("click", function (e) {
//         sideMenu.classList.remove("slide-in");
//         sideMenu.classList.add("slide-out");
//     })
// }