import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import {
  Paper,
  Grid,
  Typography,
  withStyles,
  Button,
} from "@material-ui/core";
import WizardHeader from "./wizardHeader";
import RadioMasters from "./radioMasters";
import SelectService from "./selectService";
import SelectDateDaypart from "./selectDateDaypart";
import Contacts from "./contacts";

const style = theme => ({
  root: {
    border: `8px solid ${theme.palette.common.white}`,
    margin: 36,
    padding: "36px 0 0",
    background: `rgba(255,255,255,0.9)`,
    boxShadow: `1px -1px 1px ${
      theme.palette.primary.light
    },1px -1px 1px 1px rgba(255,255,255,0.6),1px 2px 25px 2px rgba(0,0,0,0.6)
    } `
  },
  navigation: {
    boxShadow: theme.shadows[10],
    width: 110,
    fontSize: 12,
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
      width: 90
    }
  },
  prevBtn: {
    color: theme.palette.grey[700],
    background: theme.palette.common.white,
    boxShadow: theme.shadows[5]
  }
});
const Content = ({ classes }) => {
  const [activeStep, setActiveStep] = useState(0);
  const handleChange = index => e => setActiveStep(index);
  const nandleNext = () => setActiveStep(activeStep + 1);
  const nandlePrev = () => setActiveStep(activeStep - 1);
  const tabs = ["Master", "Service", "Date", "Contact"];

  return (
    <Paper style={{}} elevation={1} className={classes.root}>
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        style={{ padding: "0 8px" }}
      >
        Book your Appointment
      </Typography>
      <Typography gutterBottom>
        This information will let us know about your preferences.
      </Typography>
      <WizardHeader
        tabs={tabs}
        activeStep={activeStep}
        handleChange={handleChange}
      />

      <form>
        <SwipeableViews index={activeStep} onChangeIndex={handleChange}>
          <RadioMasters />
          <SelectService />
          <SelectDateDaypart />
          <Contacts />
        </SwipeableViews>
        <Grid
          container
          justify="space-between"
          style={{ padding: "16px 16px" }}
        >
          <Grid item>
            <Button
              disabled={activeStep === 0}
              onClick={nandlePrev}
              variant="contained"
              color="default"
              className={`${classes.navigation} ${classes.prevBtn}`}
            >
              Back
            </Button>
          </Grid>
          {activeStep < tabs.length - 1 && (
            <Grid item>
              <Button
                color="primary"
                className={classes.navigation}
                variant="contained"
                onClick={nandleNext}
              >
                Next
              </Button>
            </Grid>
          )}
          {activeStep === tabs.length - 1 && (
            <Grid item>
              <Button
                color="primary"
                className={classes.navigation}
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};
export default withStyles(style)(Content);
