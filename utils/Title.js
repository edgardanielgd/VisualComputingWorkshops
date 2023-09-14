const buildTitle = (
  sk, text, x, y, w, h
) => {
  sk.push();
  sk.textSize(35);
  sk.fill(255);
  sk.textAlign(sk.CENTER);
  sk.textFont('Georgia');
  sk.text(text, x, y, w, h);
  sk.pop();
}

export default buildTitle;
  