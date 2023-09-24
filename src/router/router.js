import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from "../App";

// MAIN PAGE COMPONENT.
const MainPageComponent = lazy(() => import("../components/pages/Main-Page-Component/Main-Page-Component"));
const MainSectionComponent = lazy(() => import('../components/sections/Main/Main-Section-Component/Main-Section-Component'));
const MainCartSectionComponent = lazy(() => import("../components/sections/Main/Main-Cart-Section-Component/Main-Cart-Section-Component"));
const MainCheckoutSectionComponent = lazy(() => import("../components/sections/Main/Main-Checkout-Section-Component/Main-Checkout-Section-Component"));
const MainDeatilSectionComponent = lazy(() => import("../components/sections/Main/Main-Detail-Section-Component/Main-Detail-Section-Component"));
const MainTransactionSectionComponent = lazy(() => import("../components/sections/Main/Main-Transaction-Section-Component/Main-Transaction-Section-Component"));
const ShopSectionComponent = lazy(() => import("../components/sections/Main/Shop-Section-Component/Shop-Section-Component"));


// EXCEPTION PAGE COMPONENT.
const ErrorPageComponent = lazy(() => import("../components/pages/Exception-Page-Component/Error-Page-Component/Error-Page-Component"));
const NotFoundPageComponent = lazy(() => import("../components/pages/Exception-Page-Component/Not-Found-Page-Component/Not-Found-Page-Component"));

// AUTHENTICATION PAGE COMPONENT.
const AuthPageComponent = lazy(() => import("../components/pages/Auth-Page-Component/Auth-Page-Component"));
const AuthSignInSectionComponent = lazy(() => import("../components/sections/Auth/Auth-Sign-In-Section-Component/Auth-Sign-In-Section-Component"));
const AuthSignUpSectionComponent = lazy(() => import("../components/sections/Auth/Auth-Sign-Up-Section-Component/Auh-Sign-Up-Section-Component"));

const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        errorElement: <ErrorPageComponent />,
        children: [
            {
                id: "main-page-component",
                path: "",
                element: <Suspense fallback={<p>Please wait loader...</p>}><MainPageComponent /></Suspense>,
                children: [
                    {
                        index: true,
                        loader: () => import("../components/sections/Main/Main-Section-Component/Main-Section-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Please wait loader...</p>}><MainSectionComponent /></Suspense>
                    },
                    {
                        path: "cart",
                        loader: () => import("../components/sections/Main/Main-Cart-Section-Component/Main-Cart-Section-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Please wait loader...</p>}><MainCartSectionComponent /></Suspense>
                    },
                    {
                        path: "checkout",
                        element: <Suspense fallback={<p>Please wait loader...</p>}><MainCheckoutSectionComponent /></Suspense>
                    },
                    {
                        path: 'detail/:product_id/:category_id',
                        loader: ({request, params}) => import("../components/sections/Main/Main-Detail-Section-Component/Main-Detail-Section-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Please wait loader...</p>}><MainDeatilSectionComponent /></Suspense>
                    },
                    {
                        path: 'transaction',
                        loader: () => import("../components/sections/Main/Main-Transaction-Section-Component/Main-Transaction-Section-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><MainTransactionSectionComponent /></Suspense>
                    },
                    {
                        path: 'shop',
                        loader: () => import("../components/sections/Main/Shop-Section-Component/Shop-Section-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><ShopSectionComponent /></Suspense>
                    }

                ]
            },
            {
                path: 'auth',
                element: <Suspense fallback={<p>Please wait loader...</p>}><AuthPageComponent /></Suspense>,
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<p>Loading...</p>}><AuthSignInSectionComponent /></Suspense>

                    },
                    {
                        path: "signup",
                        element: <Suspense fallback={<p>Loading...</p>}><AuthSignUpSectionComponent /></Suspense>
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPageComponent />
    }
])

export default router;