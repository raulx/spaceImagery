function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

const handleOpenFullImage = (url: string) => {
    const windowName = "hd";
    const width = window.screen.width;
    const height = window.screen.height;
    const windowFeatures = `width=${width},height=${height},resizable=yes,scrollbars=yes`;

    // Open a new window
    window.open(url, windowName, windowFeatures);
  };

export {getCurrentDate,handleOpenFullImage}