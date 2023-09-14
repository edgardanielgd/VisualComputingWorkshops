const buildCredits = (
  sk, x, y, w, h
) => {
  sk.push();
  sk.fill(255);
  sk.textSize(16);
  sk.textAlign(sk.CENTER);
  sk.text(`
    Créditos:\n
    Miguel Angel Puentes Cespedes\n
    Bryan Smith Colorado Lopez\n
    Reinaldo Toledo Leguizamon\n
    Edgar Daniel Gonzalez Diaz\n
  `, x, y, w, h);
  sk.pop();
}

export default buildCredits;
  