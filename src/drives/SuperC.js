drivesList.push(class FrSuperC extends Drive {
  static get driveName () { return 'SuperC' }
  static get domain () { return /superc\.ca$/ }
  static get lang () { return 'fr' }
  static get country () { return 'canada' }

  static get structure () {
    return {
      productView: {
        base: '.accordion--text',
        name: 'h1.pi--title',
        mainDescription: '.pdpDetailsContainer',
        description: 'div.accordion--text > p.pi--product-main-info__sku',

        ean: (base) => {
          const text = base.innerText || base.textContent
          const match = text.match(/\d+/)
          return match ? match[0] : null
        }
      },

      listView: {
        base: ['.products-search--grid'],
        product: {
          base: ['.default-product-tile'],
          name: '.data-product-name',
          mainDescription: '&',
          ean: (base) => base.getAttribute('data-product-code')
        }
      }
    }
  }
})
