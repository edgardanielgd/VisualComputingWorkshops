const buildCommonButton = (
  sk, caption, x, y, type
) => {
  // Assumes react is already loaded
  const button = sk.createButton(caption);
  button.position(x,y);

  switch(type){
    case 'primary':
    default:
      button.class('btn btn-primary');    
      break;

    case 'success':
      button.class('btn btn-success');
      break;
      
    case 'danger':
      button.class('btn btn-danger');
      break;

    case 'dark':
      button.class('btn btn-dark');
      break;

    case 'warning':
      button.class('btn btn-warning');
      break;
  }
  
  // button.class('btn-primary');

  return button;
} 

export default buildCommonButton;