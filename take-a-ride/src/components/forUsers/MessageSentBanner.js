function MessageSendBanner({ closeWindow, messageText }) {
  return (
    <div className="popup-main-container">
      <div className="popup-logIn">
        <svg
          className="bi bi-x popup-close-icon"
          viewBox="0 0 16 16"
          onClick={() => closeWindow()}
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
        <p className="report-banner-text">{messageText}</p>
      </div>
    </div>
  );
}
export default MessageSendBanner;
