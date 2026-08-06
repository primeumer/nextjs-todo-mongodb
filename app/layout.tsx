import "./page.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer 
        position="top-center"
        autoClose = {3000}
        theme = "dark"
        />
      </body>
    </html>
  );
}
