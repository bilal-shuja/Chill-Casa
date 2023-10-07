import React from 'react';
import colorScheme from "../Colors/Styles";

const ClientReviewModal = ({clientReviews}) => {
  return (
    <>
         <div
              className="modal fade"
              id="staticBackdrop2"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel2"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable ">
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
                      id="staticBackdropLabel2"
                      style={{ color: colorScheme.card_txt_color }}
                    >
                      Reviews
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
                      {clientReviews && clientReviews.length > 0 ? (
                        clientReviews.map((items, index) => {
                          return (
                            <div key={index} className="col-lg-6 col-sm-12 p-2">
                              <h5 className="text-info">Review#{index + 1}</h5>
                              <li>Client Name: {items.username}</li>
                              <li>Client Review: {items.review}</li>
                              <li>Client Rating: {items.rating} out of 5</li>
                              <li>Date: {items.Idate}</li>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center">
                          <h4 className="text-white">No Review Found!</h4>
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

export default ClientReviewModal