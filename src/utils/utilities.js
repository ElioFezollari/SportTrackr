const getColor = (index, total) => {
    const hue = (index * (360 / total)) % 360; 
    const saturation = 65 + (index % 2) * 10; 
    const lightness = 50 + (index % 3) * 10; 
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };


export {getColor}