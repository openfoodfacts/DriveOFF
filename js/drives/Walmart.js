drivesList.push(
  class USWalmart extends Drive {
    static get driveName () {
      return 'Walmart'
    }

    static get domain () {
      return /walmart\.com$/
    }

    static get lang () {
      return 'en-US'
    }

    static get country () {
      return 'United States of America'
    }

    static get structure () {
      return {
        productView: {
          base: '[data-testid="maincontent"]',
          name: '#main-title',
          mainDescription: '#ip-prod-desc-atf-div-1',
          description:
            '#ip-prod-desc-atf-div-1',
          ean: () => {
            try {
              return JSON.parse(
                document.querySelector('#__NEXT_DATA__').innerHTML
              ).props.pageProps.initialData.data.product.upc
            } catch (error) {}
          }
        }
      }
    }
  }
)
