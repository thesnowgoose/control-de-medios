export const getPermissions = (user) => {
    if (!user) return {};
    const { roles } = user;
    const canDeliver = roles.includes('deliver');
    const canCreate = roles.includes('create');
    const canManage = roles.includes('manage');
    const canAdd = roles.includes('add-medios');

    return {
        canDeliver,
        canCreate,
        canManage,
        canAdd
    }
}