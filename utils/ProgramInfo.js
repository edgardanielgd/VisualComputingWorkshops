const buildInfo = (
  sk, x, y, w, h, title, description
) => {
  sk.push();
  sk.fill(255);
  sk.textSize(15);
  sk.textAlign(sk.CENTER);
  const div = sk.createElement(
    'div', 
    `<h3>${title}</h3><br>${description}`
  );
  div.position(x,y);
  div.size(w,h);
  div.style('color','#ffffff');
  div.style('overflow-y',"scroll");
  div.class('text-center')
  sk.pop();
}

export default buildInfo;