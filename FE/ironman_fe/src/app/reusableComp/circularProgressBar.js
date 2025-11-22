"use client";

import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CicularProgress(val) {
  return (
    <div style={{ width: 120 }}>
      <CircularProgressbar
        value={val.percentage*100}
        text={`${parseInt(val.percentage*100)}%`}
        strokeWidth={12}
        styles={buildStyles({
          pathColor: "#158de8ff",
          textColor: "grey",
          trailColor: "#e5e7eb",
        })}
      />
    </div>
  );
}

