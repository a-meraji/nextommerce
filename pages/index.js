import Center from "../components/Center";
import Hat from "../components/Hat";
import Intro from "../components/Intro";
export default function Home() {
  return (
    <>
    <div className="absolute w-full py-10 top-0 bg-secondary"></div>
      <div className="">
        {/* <Hat /> */}
        <Intro />
        <div className="w-full h-screen bg-secondary"></div>
        <div className="w-full h-screen bg-secondary"></div>

        <Center />
      </div>
    </>
  );
}
