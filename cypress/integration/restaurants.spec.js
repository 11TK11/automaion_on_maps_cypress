describe("hover on positions", () => {
    beforeEach(() => {
      cy.visit('https://www.google.co.in/maps/@17.4729197,78.3650622,15z')
    });
    
    it('should hover displayed restaurant using menu', () => {       
        cy.get('#searchbox').wait(5000).type('Restaurantes');
		    cy.get('#searchbox-searchbutton').click();
        cy.xpath('//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div/div').find('a')
        .each(($item) => {
          if($item.attr('aria-label')!='IKEA Restaurant' && $item.attr('aria-label')!='Al Zaara Matbaq Al Mandi')
          {
            cy.visit($item.attr('href'));
            cy.xpath('//*[@id="pane"]/div/div[3]/button/img').wait(5000).click();  //collapse menu
            cy.get('canvas')
            .wait(5000)
            .trigger('mousemove')
            
            cy.get('canvas').then($canvas => {
              const canvasHeight = $canvas.height();
              const canvasWidth = $canvas.width();
              const canvasCenterX = canvasWidth / 2;
              const canvasCenterY = canvasHeight / 2;
              cy.wrap($canvas).trigger('mousemove', canvasCenterX*((10+4)/10), canvasCenterY*((30-2)/30)).wait(2000);
              cy.xpath('//*[@id="interactive-hovercard"]/div/div[1]/div/div/div[2]/div[1]/div[2]')
              .wait(5000)
              .invoke('text').then((text) => {
                cy.softAssert(text, $item.attr('aria-label'), "expected actual mismatch");
              });
            });
          }
        });
        cy.softAssertAll(); 
    });
});