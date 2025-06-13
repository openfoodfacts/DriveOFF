
const drivesList = []

// Base class to extends per drive
class Drive extends DOFFNode {
  static detect () {
    const Driver = drivesList.find(drive => {
      const drray = Array.isArray(drive.domain) ? drive.domain : [drive.domain]
      return drray.find(dr => dr.test(document.domain))
    })
    if (Driver) {
      console.info('[DriveOFF] Drive detected:', Driver.driveName, `(${document.domain})`)
      return new Driver()
    }
  }

  constructor () {
    super()
    this.detectElements()
    const style = document.createElement('style')
    style.innerText = `.driveoff_scores:not(:empty)::before { background-image: url(${chrome.runtime.getURL('img/logo-driveoff.svg')})}`
    document.body.appendChild(style)
  }

  get name () {
    return this.constructor.driveName
  }

  get observerConfig () {
    return {
      subtree: true,
      attributes: true,
      childList: true,
      characterData: true
    }
  }

  addProduct (base) {
    if (base.classList.contains('driveoff_product')) return false
    return new ProductItem({
      _structure: this._structure.productView,
      _el: { base },
      _drive: this
    })
  }

  addList (base) {
    if (base.classList.contains('driveoff_list')) return false
    return new ProductList({
      _structure: this._structure.listView,
      _el: { base },
      _drive: this
    })
  }

  mutation (mutation) {
    if (mutation.type === 'childList') {
      const { productView, listView } = this._structure
      const addedNodes = Array.from(mutation.addedNodes)
      if (addedNodes.length) {
        addedNodes.forEach(node => {
          if (node && node.classList && !Array.from(node.classList).find(c => /^driveoff_/.test(c))) {
            if (listView && listView.base && node.matches(listView.base)) this.addList(node)
            if (productView && productView.base && node.matches(productView.base)) this.addProduct(node)
          }
        })
      }
    } else if (mutation.type === 'attributes') {
      if (mutation.target.matches('body')) {
        this.detectElements()
      }
    }
  }

  // Detect lists & products in documents
  detectElements () {
    const { productView, listView } = this._structure
    if (listView && listView.base) {
      const lists = Array.from(document.body.querySelectorAll(listView.base))
      if (lists) {
        lists.forEach(base => {
          this.addList(base)
        })
      }
    }
    if (productView && productView.base) {
      const products = Array.from(document.body.querySelectorAll(productView.base))
      if (products) {
        products.forEach(base => {
          this.addProduct(base)
        })
      }
    }
  }
}
