// src/pages/property-details.tsx
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import ChatBubble from "@mui/icons-material/ChatBubble";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import Star from "@mui/icons-material/Star";

import { CustomButton } from "components";

// Removed checkImage function - relying on onError for img tags is better

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: true,
  });
  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();

  // --- Provide actual fallback image URLs ---
  const fallbackAvatar = "https://via.placeholder.com/90?text=No+Avatar"; // Placeholder avatar
  const fallbackPropertyPhoto = "https://via.placeholder.com/764x546?text=No+Property+Image"; // Placeholder property photo

  const { data, isLoading, isError } = queryResult;

  // Use optional chaining and nullish coalescing for safer access
  const propertyDetails = data?.data ?? {};
  const creator = propertyDetails?.creator ?? {};

  if (isLoading) {
    return <Typography>Loading...</Typography>; // Use Typography for consistency
  }

  if (isError) {
    return <Typography>Something went wrong!</Typography>; // Use Typography
  }

  // Check if essential details are present after loading and no error
  if (!isLoading && !isError && (!propertyDetails?._id || !creator?.email)) {
     return <Typography>Property details or creator information is missing.</Typography>;
  }

  const isCurrentUser = user?.email === creator?.email;

  const handleDeleteProperty = () => {
    const response = window.confirm("Are you sure you want to delete this property?");
    if (response) {
      mutate(
        {
          resource: "properties",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/properties");
          },
          onError: (error) => {
             console.error("Error deleting property:", error);
             // Consider using a notification provider instead of alert
             alert("Failed to delete property.");
          }
        },
      );
    }
  };

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#FCFCFC"
    >
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Details
      </Typography>

      <Box
        mt="20px"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        gap={4}
      >
        {/* Property Image and Details */}
        <Box flex={1} maxWidth={764}>
          <img
            src={propertyDetails.photo || fallbackPropertyPhoto} // Use property photo or fallback
            alt={propertyDetails.title || "Property image"} // Use title in alt text
            height={546}
            style={{ objectFit: "cover", borderRadius: "10px", width: '100%' }}
            className="property_details-img" // Keep class if specific styles are applied
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackPropertyPhoto; }} // Fallback for property photo
          />

          <Box mt="15px">
            {/* Type and Rating */}
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Typography
                fontSize={18}
                fontWeight={500}
                color="#11142D"
                textTransform="capitalize"
              >
                {propertyDetails.propertyType || "N/A"}
              </Typography>
              <Box>
                {/* TODO: Make rating dynamic if available */}
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={`star-${item}`} sx={{ color: "#F2C94C" }} />
                ))}
              </Box>
            </Stack>

            {/* Title, Location, Price */}
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
              mt={1}
            >
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  color="#11142D"
                >
                  {propertyDetails.title || "Property Title"}
                </Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place sx={{ color: "#808191" }} />
                  <Typography fontSize={14} color="#808191">
                    {propertyDetails.location || "Location not specified"}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  color="#11142D"
                >
                  Price
                </Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={25} fontWeight={700} color="#475BE8">
                    ${propertyDetails.price?.toLocaleString() ?? 'N/A'} {/* Format price */}
                  </Typography>
                  <Typography fontSize={14} color="#808191" mb={0.5}>
                    {/* TODO: Make price suffix dynamic if needed */}
                    for one day
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            {/* Description */}
            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">
                Description
              </Typography>
              <Typography fontSize={14} color="#808191" sx={{ whiteSpace: 'pre-wrap' }}> {/* Preserve line breaks */}
                {propertyDetails.description || "No description available."}
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* Agent Info and Actions */}
        <Box
          width="100%"
          flex={1}
          maxWidth={326}
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          {/* Agent Card */}
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >
            <Stack
              mt={2}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <img
                src={creator.avatar || fallbackAvatar} // Use creator avatar or fallback
                alt={`${creator.name || 'Agent'}'s avatar`}
                width={90}
                height={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => { (e.target as HTMLImageElement).src = fallbackAvatar; }} // Fallback for creator avatar
              />

              <Box mt="15px">
                <Typography fontSize={18} fontWeight={600} color="#11142D">
                  {creator.name || "Agent Name"}
                </Typography>
                <Typography
                  mt="5px"
                  fontSize={14}
                  fontWeight={400}
                  color="#808191"
                >
                  Agent
                </Typography>
              </Box>

              <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                <Place sx={{ color: "#808191" }} />
                <Typography fontSize={14} fontWeight={400} color="#808191">
                  {/* TODO: Make agent location dynamic if available */}
                  North Carolina, USA
                </Typography>
              </Stack>

              <Typography mt={1} fontSize={16} fontWeight={600} color="#11142D">
                {/* Use optional chaining for safety */}
                {creator.allProperties?.length ?? 0} Properties
              </Typography>
            </Stack>

            {/* Action Buttons */}
            <Stack
              width="100%"
              mt="25px"
              direction="row"
              flexWrap="wrap"
              gap={2}
            >
              <CustomButton
                title={!isCurrentUser ? "Message" : "Edit"}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(`/properties/edit/${propertyDetails._id}`);
                  } else {
                    // TODO: Implement message functionality
                    console.log("Message agent:", creator.email);
                  }
                }}
              />
              <CustomButton
                title={!isCurrentUser ? "Call" : "Delete"}
                backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) {
                     handleDeleteProperty();
                  } else {
                     // TODO: Implement call functionality
                     console.log("Call agent");
                  }
                }}
              />
            </Stack>
          </Stack>

          {/* Map Placeholder */}
          <Stack>
            {/* Consider using an actual map component (e.g., Google Maps React, Leaflet) */}
            <img
              src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
              width="100%"
              height={306}
              style={{ borderRadius: 10, objectFit: "cover" }}
              alt="Map placeholder showing property location" // More descriptive alt text
            />
          </Stack>

          {/* Book Now Button */}
          <Box>
            <CustomButton
              title="Book Now"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
              handleClick={() => {
                 // TODO: Implement booking functionality
                 console.log("Book now clicked for property:", propertyDetails._id);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
