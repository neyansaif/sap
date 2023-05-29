import React from "react";
import { FilterPanelProps } from "../../types/FilterPanelProps";
import {
   Typography,
   Box,
   FormGroup,
   FormControlLabel,
   Checkbox,
} from "@mui/material";

const FilterPanel: React.FC<FilterPanelProps> = ({
   studyGroups,
   selectedGroups,
   handleGroupChange,
}) => {
   return (
      <Box style={{ height: 400, width: "100%" }}>
         <Typography variant="body2" gutterBottom>
            FILTERS FOR STUDY GROUPS
         </Typography>
         <FormGroup>
            {studyGroups.map((group: string) => (
               <FormControlLabel
                  key={group}
                  control={
                     <Checkbox
                        checked={selectedGroups.includes(group)}
                        onChange={handleGroupChange}
                        value={group}
                     />
                  }
                  label={group}
               />
            ))}
         </FormGroup>
      </Box>
   );
};

export default FilterPanel;
