export default function UserPermission() {
  // Permissão do usuário no sistema
  let userPermission;
  switch (localStorage.getItem('Permission')) {
    case 'Admin':
      userPermission = 'admin';
      break;
    case 'Controlador':
      userPermission = 'managers';
      break;
    case 'Doutor':
      userPermission = 'doctors';
      break;
    default:
      break;
  }

  return userPermission;
}