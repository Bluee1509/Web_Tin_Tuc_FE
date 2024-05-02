window.addEventListener("scroll", function () {
  var header = document.getElementById("myHeader");
  var navLinks = document.querySelectorAll('.header__nav ul li a');

  if (window.scrollY > 0) {
    header.classList.add("scrolled");
    navLinks.forEach(link => {
      link.classList.add('scrolled')
    });
  } else {
    header.classList.remove("scrolled");
    navLinks.forEach(link => {
      link.classList.remove('scrolled')
    });
  }
});
