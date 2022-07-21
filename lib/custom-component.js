import { chakra, shouldFrowardProp } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const StyledDiv = chakra(motion.div, {
  shouldFrowardProp: (prop) => {
    return shouldFrowardProp(prop) || prop == "transition";
  },
});

export const StyledInput = chakra(motion.input, {
  shouldFrowardProp: (prop) => {
    return shouldFrowardProp(prop) || prop == 'transition';
  }
});

export const StyledButton = chakra(motion.button, {
  shouldFrowardProp: (prop) => {
    return shouldFrowardProp(prop) || prop == 'transition';
  }
})
