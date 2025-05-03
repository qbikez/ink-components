import React from "react";
import { Box, Text } from "../tuir.js";

export function PageIndicator({
    pageNames,
    currentPage,
  }: {
    pageNames: string[];
    currentPage: number;
  }): React.ReactNode {
    return (
      <Box height={1} justifyContent="center">
        {pageNames.map((name, idx) => (
          <Text key={idx} color={idx === currentPage ? "blue" : "white"}>
            {idx+1}: {name} |{" "}
          </Text>
        ))}
      </Box>
    );
  }
