describe("hover on positions", () => {
  beforeEach(() => {
    cy.visit('https://www.google.co.in/maps/@17.4729197,78.3650622,15z');
  });

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

    it('should hover various hoteles', () => {
		var hotels = {
			'OYO 84907 Sri Fortune Blizz': {x:(8-1)/8,y:(12-8)/12, price:'136'},//divide in 8 section from middle and move to 1 section up for x
			'OYO 13162 Swiss Legrand':{x:(20-1)/20,y:(10-1)/10, price:'94'},
			'OYO 45138 Hady Inn':{x:(10-2)/10,y:(14-8)/14, price:'91'}
		};
		cy.get('#searchbox').wait(10000).type('Hoteles');
		cy.get('#searchbox-searchbutton').click();
		cy.xpath('(//div[@aria-label="Resultados de Hoteles"]//div//div//a)[2]')
		
		cy.xpath('//*[@id="pane"]/div/div[3]/button/img').wait(5000).click();
	    cy.get('canvas')
	    .wait(5000)
	  
	    cy.get('canvas').then($canvas => {
			const canvasWidth = $canvas.width();
			const canvasHeight = $canvas.height();
			const canvasCenterX = canvasWidth / 2;
			const canvasCenterY = canvasHeight / 2;
			for (const [key, value] of Object.entries(hotels)) {
				console.log(key, value);
				var buttonX = canvasCenterX*value['x'];
				var buttonY = canvasCenterY*value['y'];
				cy.wrap($canvas).trigger('mousemove', buttonX, buttonY).wait(2000)
				cy.xpath('//*[@id="interactive-hovercard"]/div/div[1]/div/div/div[2]/div[1]/div[2]')
				.invoke('text').then((text) => {
												cy.softAssert(text, key, "expected actual mismatch");
				});
				cy.xpath('//*[@id="interactive-hovercard"]/div/div[1]/div/div/div[1]/div[3]/div/div/jsl[1]/div[2]')
				.invoke('text').then((text) => {
												console.log(key,text+ ' ' +value['price']);
												cy.softContains(text, value['price'], "expected actual mismatch");
				});
				// to hide tooltip
				cy.wrap($canvas).trigger('mousedown', buttonX, buttonY)
				cy.wrap($canvas).trigger('mouseup', buttonX, buttonY)
				
			}
			cy.softAssertAll(); 
    });
  });
});