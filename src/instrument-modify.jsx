import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function InstrumentModifyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

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
          <h2 className="mb-4">Hangszer módosítása</h2>

          <div className="card mb-4">
            <div className="card-body">
              <form
                onSubmit={(event) => {
                  event.persist();
                  event.preventDefault();

                  const form = event.target;
                  const data = new FormData(form);

                  fetch("https://kodbazis.hu/api/instruments/" + id, {
                    method: "PUT",
                    body: JSON.stringify(Object.fromEntries(data)),
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: "include",
                  }).then(() => {
                    navigate("/");
                  });
                }}
              >
                <div className="form-group row pb-3">
                  <label for="name" className="col-sm-3 col-form-label">
                    Név
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    defaultValue={instrument.name}
                  />
                </div>

                <div className="form-group row pb-3">
                  <label for="brand" className="col-sm-3 col-form-label">
                    Márka
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="form-control"
                    defaultValue={instrument.brand}
                  />
                </div>

                <div className="form-group row pb-3">
                  <label for="price" className="col-sm-3 col-form-label">
                    Ár
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    defaultValue={instrument.price}
                  />
                </div>

                <div className="form-group row pb-3">
                  <label for="quantity" className="col-sm-3 col-form-label">
                    Készlet
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="form-control"
                    defaultValue={instrument.quantity}
                  />
                </div>

                <div className="form-group row pb-3">
                  <label for="imageURL" className="col-sm-3 col-form-label">
                    Kép URL
                  </label>
                  <input
                    type="text"
                    name="imageURL"
                    id="imageURL"
                    className="form-control"
                    defaultValue={instrument.imageURL}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Mentés
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
