import { Outlet } from "react-router";
import { CommandPalette } from "./command-palette";
import { KeyboardShortcuts } from "./keyboard-shortcuts";

export function RootLayout() {
  return (
    <>
      <Outlet />
      <CommandPalette />
      <KeyboardShortcuts />
    </>
  );
}
