export default function UserPermission() {
  // Permissão do usuário no sistema
  let userPermission;
  switch (localStorage.getItem('Permission')) {
    case 'Admin':
      userPermission = 'admin';
      break;
    case 'Controlador':
      userPermission = 'manager';
      break;
    case 'Executor':
      userPermission = 'executor';
      break;
    default:
      break;
  }

  return userPermission;
}