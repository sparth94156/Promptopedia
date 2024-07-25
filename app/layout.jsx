import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata = {
  title: "Promptopedia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <Provider>
          <div>
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
};

export default RootLayout;
