drivesList.push(class FrHoura extends Drive {
  static get driveName () { return 'Houra' }
  static get domain () { return /houra\.fr$/ }
  static get lang () { return 'fr' }
  static get country () { return 'france' }

  static get structure () {
    return {
      productView: {
        base: '.FicheArticleRspv',
        name: 'h1',
        mainDescription: '#infos_produit .row .col-sm-12',
        ean: base => {
          let img = base.querySelector('img.zoom_origin')
          if (img) {
            img = new URL(img.src)
            img = /([0-9]{13})/.exec(img.pathname)
            if (img) return img[1]
          }
        }
      },
      listView: {
        base: [
          '.articles'
        ],
        product: {
          base: ['.bloc_article_float'],
          name: '.bloc_nom_marque',
          mainDescription: '.artBas',
          ean: base => {
            // Chausse-pied
            const artBas = base.querySelector('.artBas')
            if (artBas) artBas.style.height = 'auto'
            base.style.height = 'auto'
            let img = base.querySelector('img.photoArticle')
            if (img) {
              img = new URL(img.src)
              img = /([0-9]{13})/.exec(img.pathname)
              if (img) return img[1]
            }
          }
        }
      }
    }
  }
})
