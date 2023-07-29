import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs"; // Import the dayjs library

export default function Calendar({ setDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Select Date"
          onChange={(date) => {
            const localDate = dayjs(date).format("YYYY-MM-DD"); // Format the date using the local timezone
            console.log("Selected Date from Calendar:", localDate);
            setDate(localDate);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}