// @refresh reload
import { Suspense } from 'solid-js';
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import './root.css';
import { CartProvider } from './cart/cart';
import { AuthProvider } from './auth/auth';
import Header from './components/Header';
import { UserProvider } from './user/user';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <UserProvider>
              <AuthProvider state={false}>
                <CartProvider state={{ value: 0, items: [] }}>
                  <Header />
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </CartProvider>
              </AuthProvider>
            </UserProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
