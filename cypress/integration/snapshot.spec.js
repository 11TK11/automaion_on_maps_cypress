describe('Visual Testing Regression', () => {
   
    it('verify UI across the pages', () =>{
     
        cy.visit('https://www.google.co.in/maps/@17.4729197,78.3650622,15z');
        cy.compareSnapshot('Home Page', {
            //capture: 'fullPage',
            errorThreshold: 0.0
          });
            
    })
 
})