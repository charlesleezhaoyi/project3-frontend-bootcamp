export default function ErrorPopUp({ errorMessage, setErrorMessage }) {
  return (
    <div>
      <dialog
        id="error_box"
        className={`modal ${errorMessage.length && "modal-open"}`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Error</h3>
          <p className="py-4">{errorMessage}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => setErrorMessage("")}>
                Close
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setErrorMessage("")}></button>
        </form>
      </dialog>
    </div>
  );
}
