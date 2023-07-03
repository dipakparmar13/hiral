import { Header, SideBar } from "../components";
function CommonLayout({ children }) {
  return (
    <>
      <div className="d-lg-flex bg-gray-100">
        <SideBar />
        <div className="vstack h-screen overflow-y-auto">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
}
export default CommonLayout;
