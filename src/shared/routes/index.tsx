import React from 'react';
import { Routes as RoutesDOM, Route } from 'react-router-dom';

import LoginPage from '../../modules/auth/pages/LoginPage';
import DealerEditPage from '../../modules/dealers/pages/EditPage';
import DealersListPage from '../../modules/dealers/pages/ListPage';
import ResselerRegisterPage from '../../modules/dealers/pages/RegisterPage';
import OrdersListPage from '../../modules/orders/page/ListPage';
import ViewOrderPage from '../../modules/orders/page/ViewPage';
import ProductsEditPage from '../../modules/products/pages/EditPage';
import ProductsListPage from '../../modules/products/pages/ListPage';
import ProductsRegisterPage from '../../modules/products/pages/RegisterPage';
import QuestionsEditPage from '../../modules/questions/pages/EditPage';
import QuestionsListPage from '../../modules/questions/pages/ListPage';
import QuestionsRegisterPage from '../../modules/questions/pages/RegisterPage';
import UserEditPage from '../../modules/users/pages/EditPage';
import UserListPage from '../../modules/users/pages/ListPage';
import UserRegisterPage from '../../modules/users/pages/RegisterPage';
import LayoutPanel from '../components/Layout/LayoutPanel';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
    <RoutesDOM>
        <Route path="/" element={<LayoutPanel component={<LoginPage />} />} />
        <Route
            path="/login"
            element={<LayoutPanel component={<LoginPage />} />}
        />
        <Route
            path="/dashboard"
            element={<LayoutPanel component={<Dashboard />} />}
        />

        <Route
            path="/revendedores"
            element={<LayoutPanel component={<DealersListPage />} />}
        />

        <Route
            path="/revendedores/novo"
            element={<LayoutPanel component={<ResselerRegisterPage />} />}
        />

        <Route
            path="/revendedores/atualizar/:id"
            element={<LayoutPanel component={<DealerEditPage />} />}
        />

        <Route
            path="/produtos"
            element={<LayoutPanel component={<ProductsListPage />} />}
        />

        <Route
            path="/produtos/novo"
            element={<LayoutPanel component={<ProductsRegisterPage />} />}
        />

        <Route
            path="/produtos/atualizar/:id"
            element={<LayoutPanel component={<ProductsEditPage />} />}
        />

        <Route
            path="/perguntas-e-respostas"
            element={<LayoutPanel component={<QuestionsListPage />} />}
        />

        <Route
            path="/perguntas-e-respostas/novo"
            element={<LayoutPanel component={<QuestionsRegisterPage />} />}
        />

        <Route
            path="/perguntas-e-respostas/atualizar/:id"
            element={<LayoutPanel component={<QuestionsEditPage />} />}
        />

        <Route
            path="/vendas"
            element={<LayoutPanel component={<OrdersListPage />} />}
        />

        <Route
            path="/vendas/:id/visualizar"
            element={<LayoutPanel component={<ViewOrderPage />} />}
        />

        <Route
            path="/usuarios"
            element={<LayoutPanel component={<UserListPage />} />}
        />

        <Route
            path="/usuarios/novo"
            element={<LayoutPanel component={<UserRegisterPage />} />}
        />

        <Route
            path="/usuarios/atualizar/:id"
            element={<LayoutPanel component={<UserEditPage />} />}
        />
    </RoutesDOM>
);

export default Routes;
