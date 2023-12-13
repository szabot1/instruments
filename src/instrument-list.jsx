import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function InstrumentListPage() {
  const [isFetching, setIsFetching] = useState(true);
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    fetch("https://kodbazis.hu/api/instruments", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setInstruments(data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetching && <div className="spinner-border"></div>}
      {!isFetching && !instruments && <p>Hiba történt!</p>}
      {!isFetching && instruments && (
        <>
          <h2 className="mb-4">Hangszerek</h2>

          <div className="row">
            {instruments.map((instrument) => (
              <div key={instrument.id} className="col-12 col-md-6 col-lg-4">
                <div className="card mb-4">
                  <img
                    src={
                      instrument.imageURL ??
                      "https://via.placeholder.com/400x800.png?text=No+image"
                    }
                    alt={instrument.name}
                    style={{
                      maxHeight: "200px",
                      objectFit: "contain",
                    }}
                    className="card-img-top mt-4 img-fluid"
                  />
                  <div className="card-body">
                    <p className="card-text text-muted">{instrument.brand}</p>
                    <h5 className="card-title">{instrument.name}</h5>
                    <p className="card-text text-muted">
                      {new Intl.NumberFormat().format(instrument.price)} Ft -{" "}
                      {new Intl.NumberFormat().format(instrument.quantity)} db
                      készleten
                    </p>
                    <NavLink
                      to={`/hangszer/${instrument.id}`}
                      className="btn btn-primary"
                    >
                      Megtekintés
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
