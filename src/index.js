import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { RecoilRoot } from "recoil";
import reportWebVitals from "./reportWebVitals";

import { ActionIcon, CloseButton, createStyles, Divider } from "@mantine/core";
import { getVersion } from "@tauri-apps/api/app";
import { appWindow } from "@tauri-apps/api/window";

import { Minus } from "tabler-icons-react";
const useStyles = createStyles((theme) => ({
  navbar: {
    height: "30px",
    display: "flex",
  },
  navbarDrag: {
    flexGrow: "1",
    display: "flex",
    alignItems: "center",
    paddingLeft: 12,
  },
}));

const root = ReactDOM.createRoot(document.getElementById("root"));


async function verify(){
  
}

verify();


function Root() {
  const [colorScheme, toggleColorScheme] = useToggle(["dark", "light"]);
  const { classes, cx } = useStyles();
  const [appVersion, setAppVersion] = useState(null);

  useEffect(() => {
    getVersion().then((appVersion) => {
      setAppVersion(appVersion);
    });
  });

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: "Segoe UI Semibold",
          spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="bottom-center">
          <div className={classes.navbar}>
            <div className={classes.navbarDrag} data-tauri-drag-region>
              LauncherKit - {appVersion}
            </div>
            <ActionIcon
              p={2}
              m={4}
              onClick={() => {
                appWindow.minimize();
              }}
            >
              <Minus size={24} />
            </ActionIcon>
            <CloseButton
              p={2}
              m={4}
              size={24}
              onClick={() => {
                appWindow.hide();
              }}
            />
          </div>
          <Divider />
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
