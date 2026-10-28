describe('thing', () => {
  context.only('ctx', () => {
    it('waits', () => {
      cy.wait(1000);
      cy.get('a').click().should('be.visible');
      cy.pause();
    });
  });
});
