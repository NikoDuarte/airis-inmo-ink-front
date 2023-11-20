/*###############################*/
//* |-> Interfaz para crear usuarios
interface _user_c {
    name: string;
    email: string;
    password: string;
}
//* |-> Interfaz para inicio de sesion
interface _login {
    email: string;
    password: string;
}

interface _inmueble_c {
    name_inmueble: string;
    description: string;
    address: string;
    lon: number;
    lat: number;
    price: number;
}

interface _mapa_info {
    description: string,
    direccion?: string,
    name: number,
    lon: number,
    lat: number,
    color: string
}

interface _mapa_direccion {
    lon: number,
    lat: number,
    direccion: {
        ubi: string
    }
}
/*###############################*/
// TODO -> Exportacion del modulo
export {
    _user_c,
    _login,
    _inmueble_c,
    _mapa_info,
    _mapa_direccion
}