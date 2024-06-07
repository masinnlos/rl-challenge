"use client";

import {
  ConfigProvider
} from "antd";
import theme from "./themeConfig";
import { RestObjectsTable } from "./components/RestObjectsTable";

function HomePage() {
  return (
    <ConfigProvider theme={theme}>
      <RestObjectsTable />
    </ConfigProvider>

  );
}

export default HomePage;
