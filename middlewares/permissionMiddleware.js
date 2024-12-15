function checkPerm([label, ...requiredPerms]) {
    return async (req, res, next) => {
      try {
        // Assuming you attach the staff object to the req (from JWT, session, etc.)
        const staff = req.user; 
  
        if (!staff || !staff.permission) {
          return res.status(403).json({ error: 'Access denied. No permissions found.' });
        }
  
        // Find the permissions for the given label (e.g., 'Staff')
        const staffPermissions = staff.permission.find(perm => perm.label === label);
  
        if (!staffPermissions) {
          return res.status(403).json({ error: `Access denied. No permissions for ${label}` });
        }
  
        // Check if all required permissions are allowed (e.g., 'edit', 'create')
        const hasRequiredPermissions = requiredPerms.every(perm => staffPermissions[perm]);
  
        if (!hasRequiredPermissions) {
          return res.status(403).json({ error: `Access denied. Missing required permissions: ${requiredPerms.join(', ')}` });
        }
  
        next(); // Proceed if all permissions are valid
      } catch (error) {
        console.error('Error checking permissions:', error);
        res.status(500).json({ error: 'An error occurred while checking permissions' });
      }
    };
  }
  
  module.exports = checkPerm;