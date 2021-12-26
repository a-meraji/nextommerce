import Word from "./Word";

const words = ["live", "like", "it's", "a", `"DRY"`, "code,"];

export default function Moto1() {

  return (
    <div className="px-4  pb-20 pt-28 text-primarycont bg-primarycont  curier">
      <div className="text-6xl sm:text-7xl flex justify-start flex-wrap gap-y-4 gap-x-7">
        {words.map((value, i) => (
          <Word txt={value} delay={i * 0.2} />
        ))}
      </div>

      <div className="scrolly text-[30vw] font-extrabold mt-12 overflow-scroll scrollbar-hide">
        <p className="cont whitespace-nowrap">minimal but functional.</p>
      </div>
      <style jsx>{`
        .cont {
          text-transform: uppercase;
          display: inline-block;
          animation: floatText 10s infinite linear;
          padding-left: 100%; /*Initial offset, which places the text off-screen*/
        }
        @keyframes floatText {
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
