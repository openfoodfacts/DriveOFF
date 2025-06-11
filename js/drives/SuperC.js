drivesList.push(
  class FrSuperC extends Drive {
    static get driveName() {
      const name = "SuperC";
      return name;
    }

    static get domain() {
      const domainRegex = /superc\.ca$/;
      return domainRegex;
    }

    static get lang() {
      const lang = "fr";
      return lang;
    }

    static get country() {
      const country = "canada";
      return country;
    }

    static get structure() {
      const structure = {
        productView: {
          base: ".accordion--text",
          name: "h1.pi--title",
          mainDescription: ".pdpDetailsContainer",
          description: "div.accordion--text > p.pi--product-main-info__sku",

          ean: (base) => {
            const text = base.innerText || base.textContent;
            const match = text.match(/\d+/);
            return match ? match[0] : null;
          },
        },

        listView: {
          base: [".products-search--grid"],
          product: {
            base: ".default-product-tile",
            name: ".data-product-name",
            mainDescription: "&",
            ean: (base) => base.getAttribute("data-product-code"),
          },
        },
      };

      return structure;
    }
  }
);

console.log(
  "FrSuperC drive added to drivesList:",
  drivesList[drivesList.length - 1]
);
