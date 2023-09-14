const buildComboBox = (
  sk,  x, y, w, h, options
) => {
  // Assumes react is already loaded
  const select = sk.createElement('select');
  select.position(x,y);
  select.size(w,h);

  for(const optionKey in options){
    const optionDiv = sk.createElement('option');
    optionDiv.attribute('value', optionKey);
    optionDiv.html(optionKey);

    select.child(optionDiv);
  }

  return select;
} 

export default buildComboBox;