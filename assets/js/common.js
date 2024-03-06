const $ = jQuery;
const header = $("header");
const formControls = $(".form-control");
const $window = $(window);
const $body = $("body");
const $html = $("html");
const $model = $(".model");
const $footer = $("footer");
const $hasNav = $('.navList > ul > li');
var scrollTop = scrollY

// Throttle scroll event to avoid excessive firing
$hasNav.on('mouseover', function () {
  header.addClass('header-strip');
});
$hasNav.on('mouseout', function () {
  header.removeClass('header-strip');
});

$window.scroll(function () {
  scrollTop = $(this).scrollTop();
  header.toggleClass("header-fixed", scrollTop > $window.height() / 100);
  $(".FilterVStrip").toggleClass("show", (scrollTop < $footer.offset().top - $window.height()) && scrollTop > 20);
  $("#back-to-top").toggleClass("show", scrollTop > 200);
});

scrollTop > 0 ? header.addClass('header-fixed') : header.removeClass('header-fixed')

formControls.on(
  "input change",
  throttle(function () {
    const $parent = $(this).parent(".form-group");
    $parent.toggleClass("valid", this.value !== ""); // Use 'this' for native DOM element
  })
);

$body.on("click", "#back-to-top", function () {
  requestAnimationFrame(() => {
    $html.animate(
      {
        scrollTop: 0,
      },
      700
    );
  });
});

const $overlay = $(".overlay");
$body.on("click", ".model-open", function (e) {
  e.preventDefault();
  const $this = $(this);
  const $target = $($this.data("model"));
  if ($target.length) {
    // Check if $target exists
    if ($this.hasClass("model-video")) {
      const $video = $this.data("video");
      $target.children().find("#iframe1").attr("src", $video);
    }
    $target.toggleClass("is-open");
    $overlay.toggleClass("open");
  }
});
$body.on("click", ".close_model, .overlay", function (e) {
  e.preventDefault();
  const $target = $(".model");
  const $video =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  $target.removeClass("is-open");
  $overlay.removeClass("open");
  $target.children().find("#iframe1").attr("src", $video); // Reset video src only when model closes
});

function throttle(callback, delay = 250) {
  let isThrottled = false;
  return function () {
    if (!isThrottled) {
      callback.apply(this, arguments);
      isThrottled = true;
      setTimeout(() => (isThrottled = false), delay);
    }
  };
}

$('.navList >ul > li:has(> .navDropdown)').addClass('has-nav');
$body.on("mouseover", ".has-nav", function (e) {
  $('.overlay').addClass('open')
})
$body.on("mouseout", ".has-nav", function (e) {
  $('.overlay').removeClass('open')
})

// $('.top_service .dropdown>a,.sub-nav-trigger').on('click', function(e){
$body.on("click", ".top_service .dropdown>a,.sub-nav-trigger", function (e) {
  e.preventDefault();
  $(this).parent('li').siblings('.dropdown').children('.sub-nav').slideUp();
  $(this).parent('li').siblings('.dropdown').removeClass('active');
  $(this).parent('.dropdown').toggleClass('active');
  $(this).siblings('.sub-nav').slideToggle();
})

// Search
const searchInput = $('.searchWrapper .form-control');
const searchHedPop = $('.SearchHedPop');
const modelSearchody = $('.modelSearchody');
const headerSearch = $('.searchWrapper');
const searchbtn = $('.searchbtn');
const tel = $('header .tel');
var isOpen = false;
$body.on("click", ".jsBtnSeachToggle", function (e) {
  e.preventDefault();
  isOpen = !isOpen;
  if(isOpen){
    searchbtn.addClass('active');
    headerSearch.slideDown();
    searchInput.focus();
    // header.addClass("header-fixed");
    tel.hide()
  }
  else{
    searchbtn.removeClass('active');
    headerSearch.slideUp();
    modelSearchody.slideUp();
    searchInput.focusout();
    // header.removeClass("header-fixed");
    tel.show()
  }
});


searchInput.on('keyup', function () {
  var val = $(this).val().length;
  searchHedPop.toggle(val <= 3);
  modelSearchody.toggle(val > 3);
});


$('body').on('click', function (e) {
  const isSearchBtn = $(e.target).closest('.searchbtn').length > 0;
  if (!isSearchBtn) {
    isOpen = false
    headerSearch.slideUp();
    modelSearchody.slideUp();
    searchbtn.removeClass('active');
    searchInput.val("")
    tel.show()
    
  }
});
enterView({
  selector: '.animate',
  offset: 0.3,
  enter: function(el) {
    el.classList.add('entered');
  },
  exit: function (el) {
    el.classList.remove('entered');
  }
});