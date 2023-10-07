import React , {useState , useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import colorScheme from "../Colors/Styles";
import { toast } from "react-toastify";
import Chart from "react-apexcharts";
import axios from "axios";


const TherapistFinanceModal = (ID) => {

    const [therapistRevenue, setTherapistRevenue] = useState({});

    const [therapistRevenueWith24HoursBookings,setTherapistRevenueWith24HoursBookings] = useState([]);
    const [therapistRevenueWith7DaysBookings,setTherapistRevenueWith7DaysBookings] = useState([]);
    const [therapistRevenueWith30DaysBookings,setTherapistRevenueWith30DaysBookings] = useState([]);
    const [therapistRevenueWith6monthsBookings,setTherapistRevenueWith6monthsBookings] = useState([]);
    const [therapistRevenueWith12monthsBookings,setTherapistRevenueWith12monthsBookings] = useState([]);
    const [therapistBookingsWithDate, setTherapistBookingsWithDate] = useState([]);
    const [bookingStartDate, setBookingStartDate] = useState("");
    const [bookingEndDate, setBookingEndDate] = useState("");
    const [check, setCheck] = useState(false);
    
    function gettingTherapistRevenue() {
        const revenueObj = {
          therapist_id: ID,
        };
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}getCompletedBookingsByTherapistId`,
            revenueObj
          )
          .then((res) => {
            setTherapistRevenue(res.data.TimeIntervals);
            setTherapistRevenueWith24HoursBookings(
              res?.data?.TimeIntervals?.last_24_hours?.CompletedBookings
            );
            setTherapistRevenueWith7DaysBookings(
              res?.data?.TimeIntervals?.last_7_days?.CompletedBookings
            );
            setTherapistRevenueWith30DaysBookings(
              res?.data?.TimeIntervals?.last_30_days?.CompletedBookings
            );
            setTherapistRevenueWith6monthsBookings(
              res?.data?.TimeIntervals?.last_6_months?.CompletedBookings
            );
            setTherapistRevenueWith12monthsBookings(
              res?.data?.TimeIntervals?.last_12_months?.CompletedBookings
            );
          })
          .catch((err) => {
            return err;
          });
      }
    
      function gettingTherapistBookingsWithDate() {
        const bookingsWithDate = {
          start_date: bookingStartDate,
          end_date: bookingEndDate,
        };
    
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}getCompletedBookingsByDateRange`,
            bookingsWithDate
          )
          .then((res) => {
            setTherapistBookingsWithDate(res.data.CompletedBookings);
            setCheck(true);
          })
          .catch((err) => {
            return err;
          });
      }
    
      // Function to convert data to CSV format
      function convertToCSV(data) {
        if (!Array.isArray(data) || data.length === 0) {
          toast.warn("Invalid data format or empty data array.", { theme: "dark" });
        }
    
        const csvRows = [];
    
        // Add headers
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(","));
    
        // Add data rows
        for (const item of data) {
          if (typeof item !== "object") {
            toast.warn("Invalid data format: data should be an array of objects.", {
              theme: "dark",
            });
            continue;
          }
    
          const values = headers.map((header) => {
            const value = item[header];
            if (typeof value === "undefined") {
              return ""; // Handle undefined values
            }
            const escaped = ("" + value).replace(/"/g, '\\"');
            return `"${escaped}"`;
          });
          csvRows.push(values.join(","));
        }
    
        return csvRows.join("\n");
      }
    
      // Function to download data as CSV
      function downloadCSV() {
        // Convert your data to CSV format (you'll need to implement this)
        const csvData = convertToCSV(therapistRevenueWith24HoursBookings);
    
        // Create a data URI for the CSV content
        const csvDataUri =
          "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
    
        // Create an anchor element for downloading
        const link = document.createElement("a");
        link.setAttribute("href", csvDataUri);
        link.setAttribute("download", "therapist_data.csv");
        document.body.appendChild(link);
    
        // Trigger a click event to initiate the download
        link.click();
    
        // Clean up
        document.body.removeChild(link);
      }
    
      // Function to download data as CSV for 30 Days
      function downloadCSV7Days() {
        // Convert your data to CSV format (you'll need to implement this)
        const csvData = convertToCSV(therapistRevenueWith7DaysBookings);
    
        // Create a data URI for the CSV content
        const csvDataUri =
          "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
    
        // Create an anchor element for downloading
        const link = document.createElement("a");
        link.setAttribute("href", csvDataUri);
        link.setAttribute("download", "therapist_data_7_Days.csv");
        document.body.appendChild(link);
    
        // Trigger a click event to initiate the download
        link.click();
    
        // Clean up
        document.body.removeChild(link);
      }
    
      // Function to download data as CSV for 30 Days
      function downloadCSV30Days() {
        // Convert your data to CSV format (you'll need to implement this)
        const csvData = convertToCSV(therapistRevenueWith30DaysBookings);
    
        // Create a data URI for the CSV content
        const csvDataUri =
          "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
    
        // Create an anchor element for downloading
        const link = document.createElement("a");
        link.setAttribute("href", csvDataUri);
        link.setAttribute("download", "therapist_data_30_Days.csv");
        document.body.appendChild(link);
    
        // Trigger a click event to initiate the download
        link.click();
    
        // Clean up
        document.body.removeChild(link);
      }
    
      // Function to download data as CSV for 6 months
      function downloadCSV6Months() {
        // Convert your data to CSV format (you'll need to implement this)
        const csvData = convertToCSV(therapistRevenueWith6monthsBookings);
    
        // Create a data URI for the CSV content
        const csvDataUri =
          "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
    
        // Create an anchor element for downloading
        const link = document.createElement("a");
        link.setAttribute("href", csvDataUri);
        link.setAttribute("download", "therapist_data_6_months.csv");
        document.body.appendChild(link);
    
        // Trigger a click event to initiate the download
        link.click();
    
        // Clean up
        document.body.removeChild(link);
      }
    
      // Function to download data as CSV for 12 months
      function downloadCSV12Months() {
        // Convert your data to CSV format (you'll need to implement this)
        const csvData = convertToCSV(therapistRevenueWith12monthsBookings);
    
        // Create a data URI for the CSV content
        const csvDataUri =
          "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
    
        // Create an anchor element for downloading
        const link = document.createElement("a");
        link.setAttribute("href", csvDataUri);
        link.setAttribute("download", "therapist_data_12_months.csv");
        document.body.appendChild(link);
    
        // Trigger a click event to initiate the download
        link.click();
    
        // Clean up
        document.body.removeChild(link);
      }
    
      // Function to download data as CSV
      function downloadCSVForBookingDates() {
        // Convert your data to CSV format (you'll need to implement this)
        const csvData = convertToCSV(therapistBookingsWithDate);
    
        // Create a data URI for the CSV content
        const csvDataUri =
          "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
    
        // Create an anchor element for downloading
        const link = document.createElement("a");
        link.setAttribute("href", csvDataUri);
        link.setAttribute("download", "therapist_data_with_Booking_dates.csv");
        document.body.appendChild(link);
    
        // Trigger a click event to initiate the download
        link.click();
    
        // Clean up
        document.body.removeChild(link);
      }
    
      const data = {
        options: {
          chart: {
            id: "apexchart-example",
            responsive: true,
            maintainAspectRatio: false,
          },
          xaxis: {
            categories: [
              "24_Hours",
              "Last_7_Days",
              "Last_30_Days",
              "Last_6_months",
              "last_12_months",
            ],
            labels: {
              style: {
                colors: "white",
                fontSize: "14px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 400,
                cssClass: "apexcharts-xaxis-label",
              },
            },
          },
          yaxis: {
            show: true,
            labels: {
              show: true,
              style: {
                colors: "white",
                fontSize: "12px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 400,
                cssClass: "apexcharts-yaxis-label",
              },
            },
          },
        },
        seriesA: [
          {
            name: "Income",
            data: [
              therapistRevenue?.last_24_hours?.TotalTherapistAmount,
              therapistRevenue?.last_7_days?.TotalTherapistAmount,
              therapistRevenue?.last_30_days?.TotalTherapistAmount,
              therapistRevenue?.last_6_months?.TotalTherapistAmount,
              therapistRevenue?.last_12_months?.TotalTherapistAmount,
            ],
            color: "#00CFE8",
          },
        ],
      };
      useEffect(() => {
        gettingTherapistRevenue();

      }, [])
      
  return (
    <>
            <div
              className="modal fade"
              id="staticBackdrop4"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel4"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-xl">
                <div
                  className="modal-content"
                  style={{
                    background: colorScheme.card_bg_color,
                    color: colorScheme.card_txt_color,
                  }}
                >
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="staticBackdropLabel4"
                      style={{ color: colorScheme.card_txt_color }}
                    >
                      Finance
                    </h5>
                    <button
                      type="button"
                      className="close text-white"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div
                    className="modal-body"
                    style={{
                      background: colorScheme.card_bg_color,
                      color: colorScheme.card_txt_color,
                    }}
                  >
                    <div className="chart">
                      <Chart
                        height={270}
                        options={data.options}
                        series={data.seriesA}
                        type="bar"
                      />
                    </div>

                    <div className="row p-1">
                      <div className="col-lg-4 col-sm-12">
                        <label htmlFor="" className="form-label">
                          Starting Date:
                        </label>
                        <div className="form-group">
                          <input
                            type="date"
                            className="form-control"
                            // placeholder="Search by Client Name..."
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            onChange={(e) =>
                              setBookingStartDate(e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-4 col-sm-12">
                        <label htmlFor="" className="form-label">
                          End Date*
                        </label>
                        <div className="form-group">
                          <input
                            type="date"
                            className="form-control"
                            // placeholder="Search by Therapist Name..."
                            style={{
                              background: colorScheme.card_bg_color,
                              color: colorScheme.card_txt_color,
                            }}
                            onChange={(e) => setBookingEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div
                        className="col-lg-4 col-sm-12"
                        style={{ marginTop: "2em" }}
                      >
                        <button
                          className="btn btn-outline-info"
                          onClick={gettingTherapistBookingsWithDate}
                        >
                          Check
                        </button>
                      </div>
                    </div>
                    {check === true && bookingStartDate && bookingEndDate ? (
                      <div className="card-body table-responsive">
                        <table className="table  text-nowrap">
                          {therapistBookingsWithDate &&
                          therapistBookingsWithDate.length > 0 ? (
                            <tr>
                              <td>Bookings Reports With Date:</td>
                              <td>
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={downloadCSVForBookingDates}
                                >
                                  Download CSV
                                </button>
                              </td>
                            </tr>
                          ) : (
                            <tbody>
                              <tr className="text-white text-center">
                                <td>No Data Found!</td>
                              </tr>
                            </tbody>
                          )}
                        </table>
                      </div>
                    ) : (
                      <div className="card-body table-responsive">
                        <table className="table  text-nowrap">
                          <h3>Bookings Reports</h3>
                          {therapistRevenueWith24HoursBookings &&
                          therapistRevenueWith24HoursBookings.length > 0 ? (
                            <tr>
                              <td>Last 7 days</td>
                              <td>
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={downloadCSV}
                                >
                                  Download CSV
                                </button>
                              </td>
                            </tr>
                          ) : (
                            <tbody>
                              <tr className="text-white">
                                <td>No Data Found For 24 hours!</td>
                              </tr>
                            </tbody>
                          )}

                          {therapistRevenueWith7DaysBookings &&
                          therapistRevenueWith7DaysBookings.length > 0 ? (
                            <tbody>
                              <tr>
                                <td>Last 7 Days</td>
                                <td>
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={downloadCSV7Days}
                                  >
                                    Download CSV
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            <tbody>
                              <tr className="text-white">
                                <td>No Data Found For 7 Days!</td>
                              </tr>
                            </tbody>
                          )}

                          {therapistRevenueWith30DaysBookings &&
                          therapistRevenueWith30DaysBookings.length > 0 ? (
                            <tbody>
                              <tr>
                                <td>Last 30 Days</td>
                                <td>
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={downloadCSV30Days}
                                  >
                                    Download CSV
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            <tbody>
                              <tr className="text-white">
                                <td>No Data Found For 30 Days!</td>
                              </tr>
                            </tbody>
                          )}

                          {therapistRevenueWith6monthsBookings &&
                          therapistRevenueWith6monthsBookings.length > 0 ? (
                            <tbody>
                              <tr>
                                <td>Last 6 months</td>
                                <td>
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={downloadCSV6Months}
                                  >
                                    Download CSV
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            <tbody>
                              <tr className="text-white">
                                <td>No Data Found for 6 months!</td>
                              </tr>
                            </tbody>
                          )}

                          {therapistRevenueWith12monthsBookings &&
                          therapistRevenueWith12monthsBookings.length > 0 ? (
                            <tbody>
                              <tr>
                                <td>Last 12 months</td>
                                <td>
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={downloadCSV12Months}
                                  >
                                    Download CSV
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          ) : (
                            <tbody>
                              <tr className="text-white">
                                <td>No Data Found for 12 months!</td>
                              </tr>
                            </tbody>
                          )}
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default TherapistFinanceModal