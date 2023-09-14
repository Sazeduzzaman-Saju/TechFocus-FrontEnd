// RFQ Form Wizard
var current = 0;
var tabs = $(".tab");
var tabs_pill = $(".tab-pills");

loadFormData(current);

function loadFormData(n) {
  $(tabs_pill[n]).addClass("active");
  $(tabs[n]).removeClass("d-none");
  $("#back_button").attr("disabled", n == 0 ? true : false);

  if (n == tabs.length - 1) {
    $("#next_button").addClass("d-none"); // Hide the "Next" button on the last step
  } else {
    $("#next_button").removeClass("d-none"); // Show the "Next" button on other steps
  }
}

function next() {
  $(tabs[current]).addClass("d-none");
  $(tabs_pill[current]).removeClass("active");

  current++;
  loadFormData(current);
}

function back() {
  $(tabs[current]).addClass("d-none");
  $(tabs_pill[current]).removeClass("active");

  current--;
  loadFormData(current);
}

$(document).ready(function () {
  // Hide all the color divs initially
  $(".rfqoutput").hide();

  $("#rfqselector").change(function () {
    var selectedOption = $(this).val();
    $(".rfqoutput").hide();
    $("#" + selectedOption).show();
  });
});
