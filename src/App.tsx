import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";

function App() {
  return (
    <Layout
      style={{ minHeight: "97vh", padding: 20 }}
      className="linear-gradient">
      <Outlet />
    </Layout>
  );
}

export default App;
