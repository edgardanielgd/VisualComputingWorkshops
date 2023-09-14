const buildBackButton = (
  sk, x, y
) => {
  // Assumes react is already loaded
  const button = sk.createElement('a');
  button.position(x,y);

  button.class('btn btn-danger');
  button.attribute('href','index.html');
  button.html('Back <-');

  return button;
}

export default buildBackButton;