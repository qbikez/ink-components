import React from "react";
import { Box, Text } from "../tuir.js";
import { GradientText } from "./GradientText.js";

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
          <React.Fragment key={idx}>
            {idx === currentPage ? (
              <GradientText 
                text={`${idx+1}: ${name}`} 
                startColor="#4169E1" 
                endColor="#00BFFF"
              />
            ) : (
              <Text color="white">{idx+1}: {name}</Text>
            )}
            <Text> | </Text>
          </React.Fragment>
        ))}
      </Box>
    );
  }
