document.addEventListener("DOMContentLoaded", function() {
  var ctx = document.getElementById("myAreaChart");
  var myAreaChart;

  fetch('http://localhost:8080/api/post')
    .then(response => response.json())
    .then(data => {
      // Lấy dữ liệu từ API
      const posts = data.content;

      // Tính số lượng bài viết cho mỗi ngày trong tháng
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const daysInMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate(); // Số ngày trong tháng
      const postsPerDay = Array(daysInMonth).fill(0); // Khởi tạo mảng với số lượng bài viết ban đầu là 0

      posts.forEach(post => {
        const postDate = new Date(post.timeline);
        if (postDate.getMonth() === currentMonth) {
          const dayOfMonth = postDate.getDate();
          postsPerDay[dayOfMonth - 1]++; // Tăng số lượng bài viết cho ngày đó lên 1
        }
      });

      // Khởi tạo biểu đồ
      myAreaChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: daysInMonth }, (_, i) => i + 1), // Nhãn trục x là các ngày trong tháng
          datasets: [{
            label: "Số bài viết",
            backgroundColor: "rgba(78, 115, 223, 0.2)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            data: postsPerDay,
            fill: true,
          }],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1, // Bước của trục y là 1
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
              label: function(tooltipItem, chart) {
                return 'Số bài viết: ' + tooltipItem.yLabel;
              }
            }
          }
        }
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});


document.addEventListener("DOMContentLoaded", function() {
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
