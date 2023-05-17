import {
   Typography,
   Box,
   FormGroup,
   FormControlLabel,
   Checkbox,
} from "@mui/material";

type FilterPanelProps = {
   studyGroups: string[];
   selectedGroups: string[];
   handleGroupChange: any;
};

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
