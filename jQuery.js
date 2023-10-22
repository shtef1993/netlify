$(function () {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow", true);

  function addStripes() {
    $("table tr").removeClass("striped");
    $("table tr:nth-child(even)").addClass("striped");
  }

  function afterRender() {
    $('[data-toggle="popover"]').popover();
    $("table th").css("color", "darkBlue");
    addStripes();

    setTimeout(function () {
      const hideElements = $("table td a:contains('p')").filter(function () {
        return this.innerHTML.indexOf("p") == 0;
      });
      hideElements.closest("tr").remove();
      addStripes();

      const info = $("<div></div>")
        .insertAfter($("#pokemon-list"))
        .text("Skriveno: " + hideElements.length);
    }, 2000);
  }

  function fillList() {
    const data = JSON.parse(xhr.response);
    const source = document.getElementById("pokemon-list").innerHTML;
    const template = Handlebars.compile(source);
    const context = {
      pokemon: data.pokemon_species.slice(0, 20),
      tableClass: "table",
    };
    const html = template(context);

    document.getElementById("result").innerHTML = html;

    afterRender();
  }

  xhr.onload = function () {
    fillList();
  };

  xhr.send();
});

// 1. Pomoću jQueryja:

// 	- pratite resize događaj na korisničkom ekranu ispisujući širinu ekrana u konzolu
// 	- pratite kretanje miša i na ulazak miša preko retka tablice promijenite mu pozadinsku boju
// 	- na izlazak miša sa retka mora se pozadinska boja vratiti na prijašnju