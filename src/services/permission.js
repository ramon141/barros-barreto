
export function userHasAccessPermission({ pathname, typeUser }) {
    if (!typeUser)
        typeUser = localStorage.getItem('Permission');


    const permissionsByRole = {
        "Admin": {
            restrict: undefined,
            access: '*'
        },
        "Controlador": {
            restrict: undefined,
            access: ['/choice-patient-edit', '/registerpatient', '/editpatient', '/choice-patient-monitoring', '/choice-patient-reports', '/choice-raspberry-edit', '/editraspberry', '/registermodule', '/choice-module-monitoring', '/choice-raspberry-reports', '/choice-doctor-edit', '/registerdoctor']
        },
        "Doutor": {
            restrict: undefined,
            access: ['/choice-patient-edit', '/registerpatient', '/editpatient', '/choice-patient-monitoring', '/choice-patient-reports', '/choice-raspberry-edit', '/editraspberry', '/registermodule', '/choice-module-monitoring', '/choice-raspberry-reports']
        }
    };

    try {
        console.log(typeUser)

        const restrict = permissionsByRole[typeUser].restrict;
        const access = permissionsByRole[typeUser].access;

        if (access === '*' && !restrict)
            return true;

        for (let i = 0; !!restrict && i < restrict.length; i++)
            if (pathname.includes(restrict[i]))
                return false;

        for (let i = 0; !!access && i < access.length; i++)
            if (pathname.includes(access[i]))
                return true;

        return false;
    } catch (error) {
        console.log("Erro ao localizar permissão do usuário");
        console.log(error);
        return false;
    }
}