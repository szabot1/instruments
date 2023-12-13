import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function InstrumentSinglePage() {
  const { id } = useParams();

  const [isFetching, setIsFetching] = useState(true);
  const [instrument, setInstrument] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://kodbazis.hu/api/instruments/" + id, {
          credentials: "include",
        });
        const data = await res.json();
        setInstrument(data);
      } finally {
        setIsFetching(false);
      }
    })();
  }, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetching && <div className="spinner-border"></div>}
      {!isFetching && !instrument && <p>Hiba történt!</p>}
      {!isFetching && instrument && (
        <>
          <h2 className="mb-4">Hangszer</h2>

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
            </div>

            <div className="mt-2 mb-2">
              <NavLink
                to={`/hangszer/${id}/modositas`}
                className="btn btn-primary"
              >
                Módosítás
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
