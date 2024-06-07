"use client"
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "./AntdRegistry";
import "./globals.css";
import { RootLayoutProps } from "./types";
import { LoadingProvider } from "./context";
import { Header } from "antd/es/layout/layout";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <LoadingProvider>
          <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
            {children}
            </div>
          </LoadingProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

export default RootLayout;
