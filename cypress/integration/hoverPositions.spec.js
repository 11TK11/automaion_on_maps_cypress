describe("hover on positions", () => {
	
  beforeEach(() => {
    cy.visit('https://www.google.co.in/maps/@17.4729197,78.3650622,15z');
  });
  /*
  it('should hover displays hotel details', () => {
	  cy.get('canvas')
	  .wait(10000)
	  .trigger('mousemove')
	  
	  cy.get('canvas').then($canvas => {
		// Get dimension of the canvas
		const canvasWidth = $canvas.width();
		const canvasHeight = $canvas.height();
		
		// Divide in half since cursor will be at center of canvas
		
		const canvasCenterX = canvasWidth / 2;
		const canvasCenterY = canvasHeight / 2;
		
		// Determine the click position by dissecting the space where the button is
		var buttonX = canvasCenterX + ( ( canvasCenterX / 5 ) * 1 );
		var buttonY = canvasCenterY;
		
		// Wrap the canvas with the Cypress API, scroll it into view, and click in the location!
		cy.wrap($canvas).trigger('mousemove', buttonX, buttonY)
		
		buttonX = canvasCenterX + ( ( canvasCenterX / 5 ) * 1 );
		cy.wrap($canvas).trigger('mousemove', buttonX, buttonY)
		
		cy.xpath('//*[@id="interactive-hovercard"]/div/div[1]/div/div/div[2]/div[1]/div[2]')
		.should('have.text', 'Novotel Hyderabad Convention Centre')
    });
  });
  */
    it('should hover various hoteles', () => {
		cy.get('#searchbox').wait(10000).type('Hoteles');
		cy.get('#searchbox-searchbutton').click();
		cy.xpath('(//div[@aria-label="Resultados de Hoteles"]//div//div//a)[1]')
		.trigger('mousemove').click()
		/*.then(($els) => {
			// we get a list of jQuery elements
			// let's convert the jQuery object into a plain array
			return (
				Cypress.$.makeArray($els)
				// and extract inner text from each
				.map((el) => el.getAttribute('aria-label'))
			)
		}).should('deep.equal', ['first', 'third', 'fourth'])
		*/
	  cy.get('canvas')
	  .wait(10000)
	  .trigger('mousemove')
	  
	  cy.get('canvas').then($canvas => {
		// Get dimension of the canvas
		const canvasWidth = $canvas.width();
		const canvasHeight = $canvas.height();
		
		// Divide in half since cursor will be at center of canvas
		
		const canvasCenterX = canvasWidth / 2;
		const canvasCenterY = canvasHeight / 2;
		
		// Determine the click position by dissecting the space where the button is
		var buttonX = canvasCenterX-((canvasCenterY/20)*1);
		var buttonY = canvasCenterY-((canvasCenterY/10)*2);
		
		// Wrap the canvas with the Cypress API, scroll it into view, and click in the location!
		cy.wrap($canvas).trigger('mousemove', buttonX, buttonY)
		
		cy.xpath('//*[@id="interactive-hovercard"]/div/div[1]/div/div/div[2]/div[1]/div[2]')
		.should('have.text', 'OYO 13162 Swiss Legrand')
    });
  });
});