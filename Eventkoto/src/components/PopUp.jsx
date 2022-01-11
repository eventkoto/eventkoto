export function CompPopUp({
  enabled,
  question,
  yesText,
  noText,
  yesFunction,
  noFunction,
}) {
  return (
    <div
      className={`${
        enabled ? "block" : "hidden"
      } fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 flex justify-center items-center`}
    >
      <div className="bg-white opacity-100 p-3 rounded-xl">
        <h2>Proceed?</h2>
        <p className="text-3xl">{question}</p>
        <div className="flex justify-center">
          <button
            onClick={yesFunction}
            className="bg-green-500 text-white p-3 m-1"
          >
            {yesText}
          </button>
          <button
            onClick={noFunction}
            className="bg-red-500 text-white p-3 m-1"
          >
            {noText}
          </button>
        </div>
      </div>
    </div>
  );
}
