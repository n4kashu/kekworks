import React from 'react';

const LorePage = () => {
  // Navbar height is now handled by the layout
  // const navbarHeight = '60px'; 

  return (
    // Removed the outer div with padding and height styles
    // The main layout now provides padding and structure
    <iframe 
      src="/lore.html" 
      title="Lore Content"
      style={{ 
        width: '100%', 
        // Height should fill the container provided by the layout's <main> tag
        // Using vh might conflict if the layout structure changes. 
        // Let's try height: 100% to fill the parent <main> container.
        height: '100%', 
        border: 'none',                  
        display: 'block'                 
      }}
    />
  );
};

export default LorePage;
