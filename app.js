console.log("hello")

let render = data => {
    data.forEach(item => {
      let $listItem = $("<div>").text(item.descriptor);
      let $whatPoliceDoButton = $("<button>").attr("type", "button").text("Toggle Police Response");
      let $resolutionDescription = $("<p>").text(item.resolution_description).addClass("hidden").addClass("show");
      $listItem.append($whatPoliceDoButton, $resolutionDescription);
      $(".container").append($($listItem));
      $whatPoliceDoButton.on("click", event => {
         console.log(event)
          $resolutionDescription.toggleClass("hidden")
          $resolutionDescription.toggleClass("show")
      })
    })
  }
  let clearContainer = () => {$(".container").empty()}
  $(() => {
      $("button").on("click", event => {
      clearContainer();
      let $borough = $(event.currentTarget).val();
      let $inputValue = $("#input-box").val();
      let $numComplaints = 10;
      if ($inputValue) $numComplaints = $inputValue;
      const $promiseCity = $.ajax({
        url: "https://data.cityofnewyork.us/resource/erm2-nwe9.json?",
        type: "GET",
        data: {
          $limit: $numComplaints,
          $$app_token: "vSazjfkN5f4PbWjKhR8r129f3",
          agency: "NYPD",
          borough: $borough
        }
      });
      $promiseCity.then(function(data) {
        console.log(data)
        render(data);
      });
    });
  });
