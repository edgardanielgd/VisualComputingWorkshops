const buildInput = (
  sk, x, y, w, h, placeholder
) => {
  sk.push();
  sk.fill(255);
  sk.textSize(15);
  sk.textAlign(sk.CENTER);
  
  const input = sk.createInput(placeholder, 'number');
  input.position(x,y);
  input.size(w,h);
  input.class('text-center');
  sk.pop();

  return input;
}

export default buildInput;