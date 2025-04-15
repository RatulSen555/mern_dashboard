import React from "react";
import { Typography, Stack } from "@mui/material";
import AgentCard from "../agent/AgentCard"; // adjust path if needed!

const TopAgent = () => {
  // Later you can map dynamic data here
  return (
    <Stack gap={3}>
      <Typography variant="h5" fontWeight="bold" color="primary">
        Top Real Estate Agents
      </Typography>

      {/* Example static display */}
      <AgentCard
        id="1"
        name="Jane Doe"
        email="janedoe@example.com"
        avatar="https://randomuser.me/api/portraits/women/1.jpg"
        noOfProperties={15}
      />
      <AgentCard
        id="2"
        name="John Smith"
        email="johnsmith@example.com"
        avatar="https://randomuser.me/api/portraits/men/2.jpg"
        noOfProperties={22}
      />
    </Stack>
  );
};

export default TopAgent;
