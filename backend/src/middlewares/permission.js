function requirePermission(perm) {
  return (req, res, next) => {
    const pre = req.user && req.user.preemision;
    if (!pre) return res.status(403).json({ message: 'No permissions' });
    const perms = typeof pre === 'string' ? pre.split(',') : pre;
    if (perms.includes(perm) || perms.includes('admin')) return next();
    return res.status(403).json({ message: 'Permission denied' });
  };
}

module.exports = requirePermission;
