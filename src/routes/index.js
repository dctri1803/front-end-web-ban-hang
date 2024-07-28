import { OrderPage } from "../pages/OrderPage/OrderPage";
import { ProductsPage } from "../pages/ProductPage/ProductsPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { TypeProductPage } from "../pages/TypeProductPage/TypeProductPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSucess from "../pages/OrderSuccess/OrderSuccess";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import { ChangePasswordPage } from "../pages/ChangePasswordPage/ChangePasswordPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
    },
    {
        path: '/order-success',
        page: OrderSucess,
        isShowHeader: true,
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true,
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true,
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: '/change-password',
        page: ChangePasswordPage,
        isShowHeader: true,
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true,
    },
    {
        path: '/profile',
        page: ProfilePage,
        isShowHeader: true,
    },
    {
        path: '/systems/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '*',
        page: NotFoundPage,
    },
]
