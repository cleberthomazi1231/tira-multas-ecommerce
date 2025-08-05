import { motion, Variants } from 'framer-motion';
import React from 'react';

import { useLayout } from '../../hooks/layout';
import SideMenu from '../SideMenu';

const MobileMenu: React.FC = () => {
    const { showMenu } = useLayout();

    const variants: Variants = {
        open: {
            opacity: 1,
            zIndex: 1000,
            display: 'block',
            x: -1
        },
        closed: {
            opacity: 1,
            zIndex: 1000,
            display: 'none',
            x: -100
        }
    };

    return (
        <motion.nav
            initial="closed"
            animate={showMenu ? 'open' : 'closed'}
            variants={variants}
            transition={{
                delay: 0.12
            }}
        >
            <SideMenu />
        </motion.nav>
    );
};

export default MobileMenu;
