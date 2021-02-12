drivesList.push(class FrUDrive extends Drive {
  static get driveName () { return 'U' }
  static get domain () { return /coursesu\.com$/ }
  static get lang () { return 'fr' }
  static get country () { return 'france' }

  static get structure () {
    return {
      productView: {
        base: '#pdpMain',
        name: 'h1',
        mainDescription: '.actions-container',
        ean: base => {
          let img = base.querySelector('picture img')
          if (img) {
            img = new URL(img.src || img.dataset.src)
            img = /([0-9]{13})/.exec(img.pathname)
            if (img) return img[1]
          }
        }
      },
      listView: {
        base: [
          '.search-result-items',
          '.pdp-cross-sell-container',
          '.homepage-cross-sell'
        ],
        product: {
          base: [
            '.grid-tile',
            '.recommendation-tile'
          ],
          name: 'h3',
          mainDescription: '.product-tile__content'
        }
      }
    }
  }
})
