const formatPhoneNumber = (phone) => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      return '+234' + cleaned.slice(1); 
    }
    return cleaned;
  };
  

 

  module.exports = formatPhoneNumber
  

// const formatPhoneNumber = (phone) => {
//     const cleaned = ('' + phone).replace(/\D/g, '');
//     if (cleaned.startsWith('0')) {
//       return '+234' + cleaned.slice(1); 
//     }
//     if (cleaned.length === 13 && cleaned.startsWith('+234')) {
//       return cleaned;
//     }
//     return '+234' + cleaned; 
//   };
  
//   module.exports = formatPhoneNumber;
  