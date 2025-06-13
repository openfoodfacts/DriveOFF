drivesList.push(class FrIntermarche extends Drive {
  static get driveName () { return 'Intermarché' }
  static get domain () { return /intermarche\.com$/ }
  static get lang () { return 'fr' }
  static get country () { return 'france' }

  static get structure () {
    return {
      productView: {
        base: '.productDetail',
        name: 'h1',
        mainDescription: '.productDetail__resume__content > div',
        description: '#ingredients-allergens',
        ean: () => {
          const reg = /produit\/[^/]+\/([0-9]{8,13})/i.exec(new URL(document.URL).pathname)
          if (reg[1]) return Number(reg[1])
        }
      },
      listView: {
        base: [
          '.productSlider',
          '.productList__grid'
        ],
        product: {
          base: ['.product'],
          name: '.product__name',
          mainDescription: '.product__texts',
          ean: base => {
            const reg = /productEan_([0-9]{8,13})/i.exec(base.id)
            if (reg[1]) return Number(reg[1])
          }
        }
      }
    }
  }
})
