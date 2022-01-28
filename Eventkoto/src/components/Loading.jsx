export function CompLoading({
  enabled,
}) {
  return (
    <div
      className={`${
        enabled ? "flex" : "hidden"
      } fixed z-30 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 flex justify-center items-center w-full h-full`}
    >
      <div className="h-10 w-10 bg-red-600 animate-spin"></div>
    </div>
  );
}
