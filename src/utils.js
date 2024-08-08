export const getPermissions = (user) => {
    if (!user) return {};
    const canDeliver = user.roles.includes('deliver');
    const canCreate = user.roles.includes('create');
    const canManage = user.roles.includes('manage');

    return {
        canDeliver,
        canCreate,
        canManage
    }
}