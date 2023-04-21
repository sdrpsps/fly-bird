// deps
import { AppShell, Box } from "@mantine/core";

// components
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { PropsWithChildren } from "react";

export default function TableLayout(props: PropsWithChildren) {
  return (
    <AppShell header={<Header />} navbar={<Navbar />}>
      <Box pl={280}>{props.children}</Box>
    </AppShell>
  );
}
