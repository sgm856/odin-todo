export const createIcon = (iconName) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon', `icon-${iconName}`);
  
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#icon-${iconName}`);
  
  svg.appendChild(use);
  return svg;
};