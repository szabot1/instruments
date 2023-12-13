import React from "react";
import { useNavigate } from "react-router-dom";

export default function InstrumentListPage() {
  const navigate = useNavigate();

  return (
    <div className="p-5 m-auto text-center content bg-whitesmoke">
      <h2 className="mb-4">Új hangszer létrehozása</h2>

      <div className="card mb-4">
        <div className="card-body">
          <form
            onSubmit={(event) => {
              event.persist();
              event.preventDefault();

              const form = event.target;
              const data = new FormData(form);

              fetch("https://kodbazis.hu/api/instruments", {
                method: "POST",
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
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Mentés
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
