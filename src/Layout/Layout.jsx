import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

function Layout({ children }) {
  return (
    <>
      <Header />
        <div className="min-h-[80vh]  flex ">
          <div className="w-full">{children}</div>
        </div>
      <Footer />
    </>
  );
}

export default Layout;
