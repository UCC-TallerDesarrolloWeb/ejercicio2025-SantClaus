import { useNavigate as usarNavegacion } from "react-router-dom";

const Header = () => {
    const irA = usarNavegacion();

    const sesionActiva =
        localStorage.getItem("isLoggedIn") === "true";

    const finalizarSesion = () => {
        // limpieza rapida de estado
        localStorage.removeItem("isLoggedIn");

        // vuelvo al inicio
        irA("/");
    };

    return (
        <header>
            <h1>GYM</h1>

            <nav>
                <a href="/">Inicio</a>

                {
                    sesionActiva
                        ? (
                            <button onClick={finalizarSesion}>
                                Cerrar sesión
                            </button>
                        )
                        : (
                            <a href="/login">
                                Ingresar
                            </a>
                        )
                }

                <a href="/actividades">
                    Actividades
                </a>
            </nav>
        </header>
    );
};

export default Header;
