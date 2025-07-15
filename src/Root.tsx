import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './components/organisms/Pages/HomePage/Home.Page';
import { PhonesCatalogPage } from './components/organisms/Pages/Catalog/Phone/PhonesCatalogPage';
import { TabletsCatalogPage } from './components/organisms/Pages/Catalog/Tablets/TabletsCatalogPage';
import { AccessoriesCatalogPage } from './components/organisms/Pages/Catalog/Accessories/AccessoriesCatalogPage';
import { FavouritesPage } from './components/organisms/Pages/FavouritesPage/FavouritesPage';
import { CartPage } from './components/organisms/Pages/CartPage';
import { ErrorPage } from './components/organisms/Pages/ErrorPage';
import { MenuPage } from './components/organisms/Pages/MenuPage';
import { ProductDetailPage } from './components/organisms/ProductDetailPage/ProductDetailsPage';
import { ContactsPage } from './components/organisms/Pages/ContactsPage/ContactsPage';
import { RightsPage } from './components/organisms/Pages/RightsPage/RightsPage';
import { TeamPage } from './components/organisms/Pages/TeamPage/TeamPage';

const Root = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={
            <Navigate
              to="/home"
              replace
            />
          }
        />
        <Route
          path="home"
          element={<HomePage />}
        />
        <Route
          path="phones"
          element={<PhonesCatalogPage />}
        />
        <Route
          path="tablets"
          element={<TabletsCatalogPage />}
        />
        <Route
          path="accessories"
          element={<AccessoriesCatalogPage />}
        />
        <Route
          path="product/:category/:itemId"
          element={<ProductDetailPage />}
        />
        <Route
          path="favourites"
          element={<FavouritesPage />}
        />
        <Route
          path="cart"
          element={<CartPage />}
        />
        <Route
          path="menu"
          element={<MenuPage />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
        <Route
          path="contacts"
          element={<ContactsPage />}
        />
        <Route
          path="rights"
          element={<RightsPage />}
        />
        <Route
          path="team"
          element={<TeamPage />}
        />
      </Route>
    </Routes>
  );
};

export default Root;
