import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { fetchAssetUrl } from "../functions/assetURL";

function Header() {
    const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogoImageUrl = async () => {
          const url = await fetchAssetUrl('10dS6FjpWwkpe0cfqyjXf7');
          setLogoImageUrl(url);
        };
        fetchLogoImageUrl();
      }, []);

    return (
        <header className="flex flex-col items-center w-full mt-6">
            <div className="flex gap-4 items-center">
                <span className="w-16">
                    {logoImageUrl && <img src={logoImageUrl} alt="Logo" />}
                </span>
                <h1 className="my-4 text-4xl font-extrabold text-center">The Full-Spectrum Coder</h1>
            </div>
            <nav className="flex justify-center text-2xl bg-white dark:bg-[#201C35] w-11/12 p-6 my-4 rounded-sm shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_5px_0px_rgba(0,0,0,0.3)] underline decoration-transparent hover:[&>a]:decoration-[#ff4656d1]">
                <Link className="mx-10" to="/">Home</Link>
                <Link  className="mx-10" to="/about"><h1>About</h1></Link>
                <Link  className="mx-10" to="/glossary"><h1>Glossary</h1></Link>
            </nav>
            <Outlet />
        </header>
    )
}
export default Header
