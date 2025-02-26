import { Oval } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className=" bg-white   absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <Oval
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />

    </div>
  )
}
