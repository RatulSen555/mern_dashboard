// d:\WEB DEVELOPMENT PROJECTS\refine_dashboard\client\src\pages\home.tsx
import { useList } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
} from "components";

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: { pagination: { pageSize: 4 } },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;

  return (
    // Keep the overall padding for the page
    <Box padding="20px">
      {/* Changed title color from #ffff to #11142d */}
      <Typography fontSize={25} fontWeight={700} color="#ffff">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart title="Properties for Sale" value={684} series={[75, 25]} colors={["#275be8", "#c4e8ef"]} />
        <PieChart title="Properties for Rent" value={550} series={[60, 40]} colors={["#275be8", "#c4e8ef"]} />
        <PieChart title="Total Customers" value={5684} series={[75, 25]} colors={["#275be8", "#c4e8ef"]} />
        <PieChart title="Properties by Cities" value={555} series={[75, 25]} colors={["#275be8", "#c4e8ef"]} />
      </Box>

      <Stack mt="25px" width="100%" direction={{ xs: "column", lg: "row" }} gap={4}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>

      <Box flex={1} borderRadius="15px" padding="20px" bgcolor="#fcfcfc" display="flex" flexDirection="column" minWidth="100%" mt="25px">
        {/* Changed title color from #0000 to #11142d */}
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Latest Properties
        </Typography>

        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {latestProperties.map((property) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              title={property.title}
              location={property.location}
              price={property.price}
              photo={property.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
