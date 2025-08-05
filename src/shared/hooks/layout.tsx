import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ILayoutContextData {
    title: string;
    user: any;
    showMenu: boolean;
    setShowMenu(value: boolean): void;
    setTitle(title: string): void;
    setUser(user: any): void;
}

const LayoutContext = createContext<ILayoutContextData>(
    {} as ILayoutContextData
);

const LayoutDefault: React.FC<any> = ({ children }) => {
    const [title, setTitle] = useState('');
    const [user, setUser] = useState(null as any);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('@tiramulta:session');

        if (userData) {
            const { token, user } = JSON.parse(userData);
            setUser({ token, user });
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <LayoutContext.Provider
            value={{
                title,
                user,
                showMenu,
                setTitle,
                setUser,
                setShowMenu
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = (): ILayoutContextData => {
    const context = useContext(LayoutContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
};

export default LayoutDefault;
