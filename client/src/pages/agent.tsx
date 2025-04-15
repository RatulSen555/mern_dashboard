import { useList } from "@refinedev/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AgentCard } from "components";

const Agents = () => {
  const { data, isLoading, isError } = useList({ resource: "users" });
  const allAgents = data?.data ?? [];

  if (isLoading) return <div>Loading agents...</div>;
  if (isError) return <div>Oops! Failed to load agents.</div>;

  return (
    <Box padding="20px">
      <Typography fontSize={25} fontWeight={700} color="#ffff">
        Agents List
      </Typography>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: "20px", backgroundColor: "#0000" }}>
        {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            noOfProperties={agent.allProperties.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Agents;
