import { useState } from "react";
export default function TableKinds({
  i,
  register,
  errors,
  storeSt,
  setStoreSt,
}) {
  const [color, setColor] = useState(storeSt[i].color);

  const TR = (val, j) => (
    <tr>
      <td>
        <input
          className="w-full bg-gray-300 bg-opacity-20 text-gray-200 p-1"
          type="text"
          placeholder="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            let tempObj = storeSt;
            tempObj[i]["color"] = e.target.value;
            setStoreSt(tempObj);
          }}
        />
      </td>
      <td>
        <select
          className="w-full text-gray-500 bg-gray-300 bg-opacity-20 p-1"
          name="size"
          onChange={(e) => {
            let tempObj = storeSt;
            tempObj[i]["sizeAmnt"][j]["size"] = e.target.value;
            setStoreSt(tempObj);
          }}
        >
          <option selected={"" === val["size"] ? true : false}>
            select size
          </option>
          <option value="XS" selected={"XS" === val["size"] ? true : false}>
            XS
          </option>
          <option value="S" selected={"S" === val["size"] ? true : false}>
            S
          </option>
          <option value="M" selected={"M" === val["size"] ? true : false}>
            M
          </option>
          <option value="L" selected={"L" === val["size"] ? true : false}>
            L
          </option>
          <option value="XL" selected={"XL" === val["size"] ? true : false}>
            XL
          </option>
          <option value="XXL" selected={"XXL" === val["size"] ? true : false}>
            XXL
          </option>
        </select>
      </td>
      <td>
        <input
          className="w-full bg-gray-300 bg-opacity-20 text-gray-200 p-1"
          type="number"
          placeholder="amount"
          defaultValue={val["amount"]}
          onChange={(e) => {
            let tempObj = storeSt;
            tempObj[i]["sizeAmnt"][j]["amount"] = e.target.value;
            setStoreSt(tempObj);
          }}
        />
      </td>
    </tr>
  );

  return (
    <div className="w-full px-0 mx-auto">
      <table className="mt-6 mb-4">
        <tr style={{ textAlign: "left" }}>
          <th>color</th>
          <th>size</th>
          <th>amount</th>
        </tr>
        {storeSt[i]["sizeAmnt"].map((val, j) => TR(val, j))}
      </table>
      <div className="mb-6">
        <button
          className="w-28 bg-gray-100 bg-opacity-90  mt-4 rounded-full text-gray-800 px-auto py-0.5 hover:bg-transparent hover:border-solid hover:border-[1px] hover:border-gray-200 hover:text-gray-100"
          onClick={() => {
            let tempObj = storeSt;
            tempObj[i]["sizeAmnt"].push({ size: "", amount: 0 });
            setStoreSt(tempObj);
          }}
        >
          add row
        </button>
        {storeSt[i]["sizeAmnt"].length > 1 ? (
          <button
            className="ml-3 w-28 bg-gray-100 bg-opacity-90  mt-4 rounded-full text-gray-800 px-auto py-0.5 hover:bg-transparent hover:border-solid hover:border-[1px] hover:border-gray-200 hover:text-gray-100"
            onClick={() => {
              let tempObj = storeSt;
              tempObj[i]["sizeAmnt"].pop();
              setStoreSt(tempObj);
            }}
          >
            {" "}
            delete row
          </button>
        ) : (
          ""
        )}
      </div>
      <label>image URLs</label>
      <p className="text-xs mt-2">
        use "," to seprate urls from each other. enter the main url first
      </p>
      <textarea
        input={storeSt[i]["imgUrls"]}
        defaultValue={storeSt[i]["imgUrls"]}
        onInput={(e) => {
          let tempUrls = e.target.value;
          tempUrls = tempUrls.split(",");
          let tempObj = storeSt;
          tempObj[i]["imgUrls"] = tempUrls;
          setStoreSt(tempObj);
        }}
        className="w-full h-48 bg-gray-300 bg-opacity-20  mt-4 mb-1 rounded-md text-gray-200 pl-3 py-0.5"
        placeholder="https://..."
        {...register(`imgUrls${i}`, { required: true })}
      />
      {errors[`imgUrls${i}`] && <p className="text-red-700 mb-8">*URLs</p>}
      <hr />
    </div>
  );
}
