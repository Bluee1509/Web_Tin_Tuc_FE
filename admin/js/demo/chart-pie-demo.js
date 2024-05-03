/* document.addEventListener("DOMContentLoaded", function() {
  var ctx = document.getElementById("myPieChart");
  var myPieChart;

  // Fetch data for "approve" status
  fetch('http://localhost:8080/api/post/getByStatus?status=approve')
    .then(response => response.json())
    .then(data => {
      const approveCount = data.total;

      // Fetch data for "pending" status
      return fetch('http://localhost:8080/api/post/getByStatus?status=pending')
        .then(response => response.json())
        .then(data => {
          const pendingCount = data.total;

          // Fetch data for "reject" status
          return fetch('http://localhost:8080/api/post/getByStatus?status=reject')
            .then(response => response.json())
            .then(data => {
              const rejectCount = data.total;

              // Create Pie Chart
              createPieChart(approveCount, pendingCount, rejectCount);
            });
        });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  function createPieChart(approveCount, pendingCount, rejectCount) {
    // Data for Pie Chart
    const labels = ["Approve", "Pending", "Reject"];
    const data = [approveCount, pendingCount, rejectCount];
    const backgroundColor = ['#4e73df', '#1cc88a', '#36b9cc'];
    const hoverBackgroundColor = ['#2e59d9', '#17a673', '#2c9faf'];

    // Create Pie Chart
    myPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor,
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false
        },
        cutoutPercentage: 80,
      },
    });
  }
});
 */