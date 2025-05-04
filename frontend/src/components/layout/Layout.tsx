import Header from "../header/Header";
// import Footer from "../footer/Footer";
import "./Layout.scss";

export default function Layout(props: any) {
  return (
    <>
      <Header />
      {props.children}
      {/* <Footer /> */}
    </>
  );
}
