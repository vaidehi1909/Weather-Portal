import { Outlet } from "react-router-dom";
import { Layout } from "antd";

function App() {

  return (
    <Layout style={{ minHeight: "97vh" }}>
      <Outlet />
    </Layout>
  )
}

export default App
