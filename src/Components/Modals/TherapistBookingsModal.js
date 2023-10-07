import React from 'react';
import colorScheme from "../Colors/Styles";


const TherapistBookingsModal = ({therapistBookings}) => {
  return (
    <>
               
                <div
              className="modal fade"
              id="staticBackdrop"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable modal-lg">
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
                      id="staticBackdropLabel"
                      style={{ color: colorScheme.card_txt_color }}
                    >
                      Bookings
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
                    <div className="row">
                      {therapistBookings && therapistBookings.length > 0 ? (
                        therapistBookings.map((items, index) => {
                          return (
                            <div key={index} className="col-lg-6 col-sm-12 p-2">
                              <h5 className="text-warning">
                                Booking#{index + 1}
                              </h5>
                              <li>Client Name: {items.username}</li>
                              <li>Booking Date: {items.date}</li>
                              <li>Booking Time: {items.time}</li>
                              <li>Duration: {items.duration}</li>
                              <li>Price: {items.price}</li>
                              <li>Address: {items.address}</li>
                              {items.status === "Pending" ? (
                                <li className="text-danger">
                                  Status: {items.status}
                                </li>
                              ) : items.status === "In_progress" ? (
                                <li className="text-success">
                                  Status: {items.status}
                                </li>
                              ) : (
                                <li className="text-info">
                                  Status: {items.status}
                                </li>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center">
                          <h4 className="text-white">No Bookings Found!</h4>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default TherapistBookingsModal