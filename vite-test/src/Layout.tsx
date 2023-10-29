import  { ReactNode } from 'react';
import Header from './components/Header';
import Aside from './components/Aside';

type LayoutProps = {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
        <Header />
        <main className='grid grid-cols-1 md:grid-cols-[4fr_1fr] px-10 md:px-20 max-w-screen-2xl'>
            {children}
            <Aside />
        </main>
        </>
        )
    }
    export default Layout;