// components/agent/AgentCard.tsx
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LocationCity from "@mui/icons-material/LocationCity";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import { useGetIdentity } from "@refinedev/core";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import type { AgentCardProp, InfoBarProps } from "interfaces/agent"; // Assuming interfaces/agent exists

// Basic check (can be improved with onError)
const checkImage = (url: string): boolean => {
  return !!url; // Simplified check: assume valid if URL exists
};

// InfoBar component
const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack minWidth={{ xs: "calc(50% - 10px)", sm: 150 }} gap={1} direction="row" alignItems="center">
    {icon}
    <Typography fontSize={14} color="#808191" noWrap>
      {name}
    </Typography>
  </Stack>
);

// AgentCard component
const AgentCard = ({ id, name, email, avatar, noOfProperties }: AgentCardProp) => {
  const { data: currentUser } = useGetIdentity({
    v3LegacyAuthProviderCompatible: true,
  });

  // Define the fallback avatar URL here
  const fallbackAvatar = "";

  // Determine link based on whether the agent is the current user
  const generateLink = () => (currentUser?.email === email ? "/my-profile" : `/agents/show/${id}`);

  return (
    <Box
      component={Link}
      to={generateLink()}
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
        padding: "20px",
        borderRadius: "10px",
        bgcolor: "#fcfcfc",
        boxShadow: "0 4px 12px rgba(240, 233, 233, 0.05)",
        textDecoration: 'none',
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Agent Avatar */}
      <img
        // Use the defined fallbackAvatar constant
        src={checkImage(avatar) ? avatar : fallbackAvatar}
        alt={`${name}'s avatar`}
        width={90}
        height={90}
        style={{
          borderRadius: '8px',
          objectFit: 'cover',
          flexShrink: 0
         }}
        // Use the defined fallbackAvatar constant in onError
        onError={(e) => { (e.target as HTMLImageElement).src = fallbackAvatar; }}
      />

      {/* Agent Info Stack */}
      <Stack
        direction="column"
        justifyContent="space-between"
        flex={1}
        gap={2}
      >
        {/* Name and Title */}
        <Stack gap={0.5} direction="column" alignItems="flex-start">
          <Typography fontSize={20} fontWeight={600} color="#11142d">
            {name}
          </Typography>
          <Typography fontSize={14} color="#808191">
            Real-Estate Agent
          </Typography>
        </Stack>

        {/* Info Bars */}
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignItems="center"
          gap="15px"
        >
          <InfoBar icon={<EmailOutlined sx={{ color: "#808191", fontSize: 20 }} />} name={email} />
          {/* Consider making location and phone dynamic props */}
          <InfoBar icon={<Place sx={{ color: "#808191", fontSize: 20 }} />} name="London" />
          <InfoBar icon={<Phone sx={{ color: "#808191", fontSize: 20 }} />} name="+502-3231-4141" />
          <InfoBar
            icon={<LocationCity sx={{ color: "#808191", fontSize: 20 }} />}
            name={`${noOfProperties} Properties`}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AgentCard;
