export default function UserPermission() {
  // Permissão do usuário no sistema
  let userPermission;
  switch (localStorage.getItem('Permission')) {
    case 'Admin':
      userPermission = 'admin';
      break;
    case 'Técnico':
      userPermission = 'managers';
      break;
    case 'Médico':
      userPermission = 'doctors';
      break;
    default:
      break;
  }

  return userPermission;
}