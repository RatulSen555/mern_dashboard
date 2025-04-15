// components/layout/Header/index.tsx
import React from "react";
import { useGetIdentity } from "@refinedev/core";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity({ v3LegacyAuthProviderCompatible: true });
  const showUserInfo = user && (user.name || user.avatar);

  return (
    // Using a light background as requested previously. Elevation 0 removes shadow.
    <AppBar color="default" position="sticky" elevation={0} sx={{ background: "#fcfcfc" }}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end" // Aligns user info to the right
          alignItems="center" // Vertically centers items in the stack
        >
          {showUserInfo && (
            <Stack
              direction="row"
              gap="16px" // Space between avatar and name
              alignItems="center" // Vertically center avatar and name relative to each other
            >
              {user.avatar && <Avatar src={user.avatar} alt={user.name ?? "User Avatar"} />}
              {user.name && (
                <Typography variant="subtitle2" sx={{ color: "#11142d" }}>
                  {user.name}
                </Typography>
              )}
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
