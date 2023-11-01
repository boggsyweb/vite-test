import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl" >Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}