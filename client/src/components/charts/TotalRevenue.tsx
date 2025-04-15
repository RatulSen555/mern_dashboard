// d:\WEB DEVELOPMENT PROJECTS\refine_dashboard\client\src\components\charts\TotalRevenue.tsx
import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowCircleUpRounded from "@mui/icons-material/ArrowCircleUpRounded";

import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";

const TotalRevenue = () => {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      {/* Changed color from #000000 to #11142d */}
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Total Revenue
      </Typography>

      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        {/* Changed color from #000000 to #11142d */}
        <Typography fontSize={28} fontWeight={700} color="#11142d">
          $236,535
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          {/* Changed arrow color from #000000 to green */}
          <ArrowCircleUpRounded sx={{ fontSize: 25, color: "#2ED480" }} />
          <Stack>
            {/* Changed color from #00000 (typo) to #11142d */}
            <Typography fontSize={15} color="#11142d">
              0.8%
            </Typography>
            {/* Kept this color as it's a secondary info text */}
            <Typography fontSize={12} color="#808191">
              Than Last Month
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ReactApexChart
        series={TotalRevenueSeries}
        type="bar"
        height={310}
        options={TotalRevenueOptions}
      />
    </Box>
  );
};

export default TotalRevenue;
