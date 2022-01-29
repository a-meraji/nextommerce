import Word from "./Word";

const words = ["live", "like", "it's", "a", `"DRY"`, "code,"];

export default function Moto1() {

  return (
    <div className="px-4  py-10  text-primarycont bg-primarycont  curier">
      <div className="text-6xl pt-32 -mb-10 sm:text-7xl flex justify-start flex-wrap gap-y-4 gap-x-7">
        {words.map((value, i) => (
          <Word key={i} txt={value} delay={i * 0.2} />
        ))}
      </div>

      <div className="scrolly text-[28vw] font-extrabold overflow-scroll scrollbar-hide">
        <p className="cont whitespace-nowrap">minimal & functional.</p>
      </div>
      <style jsx>{`
        .cont {
          text-transform: uppercase;
          display: inline-block;
          animation: floatText 13s infinite linear;
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
