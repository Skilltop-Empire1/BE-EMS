const validatePermissions = (permissions) => {
    const validLabels = ['Department', 'Staff', 'Patients', 'Appointments', 'Accounts', 'Reports'];
    
    return permissions.every((perm) => {
      return (
        validLabels.includes(perm.label) &&
        typeof perm.view === 'boolean' &&
        typeof perm.create === 'boolean' &&
        typeof perm.edit === 'boolean' &&
        typeof perm.delete === 'boolean' &&
        typeof perm.transfer === 'boolean'
      );
    });
  };


  module.exports = { validatePermissions }; 