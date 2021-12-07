import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { InputLabel, Input } from "@mui/material";

export const WalkingTime = () => {
  const [pace, setPace] = useState(3.5);
  const [dist, setDist] = useState(500);

  const [timeMin, setTimeMin] = useState(0);
  const [timeSec, setTimeSec] = useState(0);

  const [vehicle, setVehicle] = useState(30);
  const [allowedTime, setAllowedTime] = useState(120);
  const [extra, setExtra] = useState(50);

  const [feet, setFeet] = useState("feet");
  const [timeDist, setTimeDist] = useState("dist");

  let totalSeconds =
    ((parseInt(dist) * 2) / (parseInt(pace) || 1) || 0) +
    (parseInt(timeMin) * 60 || 0) +
    (parseInt(timeSec) || 0) +
    (parseInt(vehicle) || 0) +
    (parseInt(allowedTime) || 0) +
    (parseInt(extra) || 0);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.round(totalSeconds - minutes * 60);

  const [total, setTotal] = useState(`${minutes} minutes, ${seconds} seconds`);

  useEffect(() => {
    setTotal(`${minutes} minutes, ${seconds} seconds`);
  }, [minutes, seconds]);

  const handleChangeFeet = () => {
    if (feet == "feet") {
      setFeet("meters");
      setDist(dist * 0.3048);
      setPace(pace * 0.3048);
    } else {
      setFeet("feet");
      setDist(dist / 0.3048);
      setPace(pace / 0.3048);
    }
  };

  const handleChangeTimeDist = () => {
    if (timeDist == "dist") {
      setTimeDist("time");
      setTimeMin(4);
      setTimeSec(46);
      setDist("0");
    } else {
      setTimeDist("dist");
      setTimeMin(0);
      setTimeSec(0);
      if (feet == "feet") {
        setDist(500);
      } else if (feet == "meters") {
        setDist(152.4);
      }
    }
  };

  const handleRound = () => {
    if (seconds > 0) {
      minutes++;
      seconds = 0;
    }
    setTotal(`${minutes} minutes`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Grid container columnSpacing="12">
        <Grid item xs="12">
          <p>
            This tool calculates needed layover or schedule flexibility for
            restroom access from distance and other parameters you set. It is
            based on the estimated walking times from{" "}
            <a
              target="_blank"
              href="https://mutcd.fhwa.dot.gov/htm/2009/part4/part4e.htm"
            >
              MUTCD Reference on Walking Speed
            </a>
            .
          </p>
        </Grid>

        <Grid item xs="12" sm="6">
          <h2>Distance to and from nearest toilet</h2>

          {timeDist == "dist" && (
            <>
              <p className="label">
                Walking speed = {Math.round(pace * 100) / 100} {feet}/second
              </p>
              <p className="helperText"></p>
              <FormControl>
                <InputLabel>Change walking speed</InputLabel>

                <Input
                  min="1"
                  type="number"
                  placeholder="Walking speed"
                  onChange={(e) => setPace(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      {feet} per second
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  The average is 3.5 feet/second, or 1.0668 Metres
                </FormHelperText>
              </FormControl>
              <br /> <br />
              <p className="label">
                Distance each way = {Math.round(dist * 100) / 100} {feet}
              </p>
              <FormControl>
                <InputLabel>Change distance</InputLabel>

                <Input
                  min="1"
                  type="number"
                  placeholder="Distance"
                  onChange={(e) => setDist(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">{feet}</InputAdornment>
                  }
                />
              </FormControl>
              <br />
              <br />
              <Button
                variant="contained"
                size="small"
                onClick={() => handleChangeFeet()}
              >
                Change to {feet == "feet" ? "meters" : "feet"}
              </Button>
            </>
          )}

          {timeDist == "time" && (
            <>
              <p className="label">
                Time = {timeMin} minutes, {timeSec} seconds
              </p>
              <FormControl>
                <InputLabel>Minutes</InputLabel>

                <Input
                  min="1"
                  type="number"
                  placeholder="Minutes"
                  onChange={(e) => setTimeMin(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputLabel>Seconds</InputLabel>

                <Input
                  min="1"
                  type="number"
                  placeholder="Seconds"
                  onChange={(e) => setTimeSec(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormHelperText>
                  Only input the time for one-way - the calculator will double
                  it to work out the way there and back!
                </FormHelperText>
              </FormControl>
            </>
          )}
          <br />
          <br />

          {timeDist == "dist" ? (
            <FormControl>
              <FormHelperText>
                If you know how long it takes to get to the nearest toilet, you
                can input the time, rather than distance
              </FormHelperText>
            </FormControl>
          ) : (
            <FormControl>
              <FormHelperText>
                If you know how far the nearest toilet is from the place of
                work, you can input that, rather than the time
              </FormHelperText>
            </FormControl>
          )}
          <br />
          <Button
            variant="contained"
            size="small"
            onClick={() => handleChangeTimeDist()}
          >
            Change to {timeDist == "dist" ? "time" : "distance and pace"}
          </Button>
        </Grid>

        <Grid item xs="12" sm="6">
          <h2>Extra time</h2>
          <p className="label">Time to secure vehicle = {vehicle} seconds</p>
          <FormControl>
            <InputLabel>Change time</InputLabel>
            <Input
              min="0"
              type="number"
              placeholder="Time to secure vehicle"
              onChange={(e) => setVehicle(e.target.value)}
              endAdornment={
                <InputAdornment position="end">seconds</InputAdornment>
              }
            />
          </FormControl>
          <br /> <br />
          <p className="label">
            Time allowed to use bathroom = {allowedTime} seconds
          </p>
          <FormControl>
            <InputLabel>Change time</InputLabel>
            <Input
            min="1"
            type="number"
            placeholder="Time to use bathroom"
            onChange={(e) => setAllowedTime(e.target.value)}
            endAdornment={
              <InputAdornment position="end">seconds</InputAdornment>
            }
          />
        </FormControl>
          <br /> <br />
          <p className="label">Extra time = {extra} seconds</p>
          <FormControl>
            <InputLabel>Change time</InputLabel>
            <Input
            min="0"
            type="number"
            placeholder="Extra time"
            onChange={(e) => setExtra(e.target.value)}
            endAdornment={
              <InputAdornment position="end">seconds</InputAdornment>
            }
          />
          <FormHelperText>
          Any other extra time necessary
          </FormHelperText>
        </FormControl>
        </Grid>
      </Grid>

      <h3>Total walking time = {total}</h3>
      <Button variant="contained" size="large" onClick={() => handleRound()}>
        Round up
      </Button>
    </div>
  );
};
