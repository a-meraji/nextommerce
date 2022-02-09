import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TableKinds from "../../../../components/admin/TableKinds";
import AcceptModal from "../../../../components/admin/AcceptModal";
import { server } from "../../../../config";
import authHandler from "../../../../shared/utils/authHandler";

function edit({ id, product, allCategories }) {
  const router = useRouter();
  const {
    name,
    category,
    price,
    store,
    description,
    sale,
    newArival,
    available,
  } = product;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(newArival);
  //states for different kinds of a product diffrent colors sizes and amounts
  const [storeSt, setStoreSt] = useState(store);
  // category State
  const [catSt, setCatSt] = useState(category);
  // final product
  const [save, setSave] = useState(false);
  const [finalPro, setFinalPro] = useState(product);

  // modal state
  const [showModal, setShowModal] = useState(false);

  // fetch data just after click on save  button
  useEffect(async () => {
    if (save) {
      const res = await fetch("/api/product/crud", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPro),
      });

      const athorized = res.headers.get("authorized") === "true";
      const data = await res.json();

      if (athorized) {
        if (data.message == "updated") {
          alert("changes saved successfuly");
        router.back();
      } else {
        alert("something went wrong try again later");
      }
      setSave(false);
    }else{
      router.push("/admin/login");
    }
  }
  }, [save]);

  const submitHandler = (form) => {
    // make a product model to send
    const { name, category, price, description, sale, newArival, available } =
      form;

    const newName = name.replace(/ /g, "_");
    const newProduct = {
      id,
      name: newName,
      category,
      price,
      store: storeSt,
      description,
      sale,
      newArival,
      available,
    };
    setFinalPro(newProduct);
  };

  return (
    <div className="bg-black bg-opacity-95 w-full text-gray-200 p-6">
      <form
        className="w-[60%] mx-auto flex flex-col"
        onSubmit={handleSubmit(submitHandler)}
      >
        {/* modal for saving new store */}
        <AcceptModal
          showModal={showModal}
          setShowModal={setShowModal}
          setSave={setSave}
        />

        <label className="mt-5 ml-10">name</label>
        <input
          className="w-72 ml-8 bg-gray-300 bg-opacity-20  mt-2 rounded-full text-gray-200 pl-3 py-0.5"
          type="text"
          placeholder="product name..."
          defaultValue={name.replace(/_/g, " ")}
          {...register("name", {
            required: true,
            pattern:
              /^[^+={}()<>!@#$%^&*?;:,|\\/_.]*[^\s+={}()<>!@#$%^&*?;:,|\\/_.]$/,
          })}
        />
        {errors.name && (
          <p className="text-red-700 ml-10 mt-1">
            {errors.name.type === "required"
              ? "enter the product name"
              : "name should not end with white space or containes any of these +={}()<>!@#$%^&*?;:,|\\._/"}
          </p>
        )}
        {/* category */}
        <label className="mt-5 ml-10">Category</label>
        <select
          className="w-72 ml-8 bg-gray-300 bg-opacity-20  mt-2 rounded-full pl-3 py-0.5 text-gray-400"
          name="category"
          onChange={(e) => {
            setCatSt(e.target.value);
          }}
          {...register("category", { required: true })}
        >
          {allCategories?.map((cat, i) => (
            <option key={i} value={cat} selected={cat === catSt ? true : false}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-700 ml-10">choose the product category</p>
        )}
        {/* price */}
        <label className="mt-5 ml-10">price</label>
        <input
          className="w-72 ml-8 bg-gray-300 bg-opacity-20  mt-2 rounded-full text-gray-200 pl-3 py-0.5"
          type="number"
          placeholder="$"
          defaultValue={price}
          {...register("price", { required: true })}
        />
        {errors.price && (
          <p className="ml-10 text-red-700">enter the product price</p>
        )}
        {/* sotre */}
        <div className="border-[1px] w-full  px-8 rounded-md my-9 pb-9">
          {storeSt?.map((kind, i) => {
            return (
              <TableKinds
                key={i}
                i={i}
                register={register}
                errors={errors}
                storeSt={storeSt}
                setStoreSt={setStoreSt}
              />
            );
          })}

          {/* adding new kind or delete the last kind */}
          <div className="text-center flex flex-row justify-between">
            <button
              className="w-1/2 mx-auto mt-10 bg-gray-100 bg-opacity-90 rounded-full text-gray-800 px-auto py-0.5 hover:bg-transparent hover:border-solid hover:border-[1px] hover:border-gray-200 hover:text-gray-100"
              onClick={() => {
                setStoreSt([
                  ...storeSt,
                  {
                    color: "",
                    colorCode: "",
                    sizeAmnt: [{ size: "", amount: 0 }],
                    imgUrls: [],
                  },
                ]);
              }}
            >
              add new color
            </button>
            <br />
            {storeSt.length > 1 && (
              <button
                className="w-1/2 ml-1 mt-10 bg-red-600 rounded-full text-gray-200 px-auto py-0.5 hover:bg-transparent hover:border-solid hover:border-[1px] hover:border-red-600 hover:text-red-600"
                onClick={() => {
                  let tempObj = storeSt;
                  tempObj.pop();
                  setStoreSt(tempObj);
                }}
              >
                delete last color
              </button>
            )}
          </div>
        </div>
        {/* description */}
        <label className="mt-5  ml-2">description</label>
        <textarea
          className="w-full h-56 bg-gray-300 bg-opacity-20  mt-2 rounded-md text-gray-200 pl-3 py-0.5"
          type="text"
          defaultValue={description}
          placeholder="product description..."
          {...register("description", { required: true })}
        />
        {errors.description && (
          <p className="text-red-700 ml-10">enter the product description</p>
        )}
        {/* sale & availablity */}
        <div className="mt-6">
          <input
            className="mt-3 mr-2"
            type="checkbox"
            {...register("sale")}
            defaultChecked={sale}
          />
          <label>on sale</label>
        </div>
        <div className="mt-3">
          <input
            className="mt-3 mr-2"
            type="checkbox"
            {...register("newArival")}
            defaultChecked={newArival}
          />
          <label>New Arival</label>
        </div>
        <div>
          <input
            className="mt-3 mr-2"
            type="checkbox"
            {...register("available")}
            defaultChecked={available}
          />
          <label>is available</label>
        </div>

        <button
          className="w-3/4 mx-auto mt-10 bg-gray-100 bg-opacity-90 rounded-full text-gray-800 px-auto py-1.5 hover:bg-transparent hover:border-solid hover:border-[1px] hover:border-gray-200 hover:text-gray-100"
          onClick={() => {
            setShowModal(true);
          }}
        >
          save
        </button>
      </form>
    </div>
  );
}

export default edit;

export async function getServerSideProps(context) {
  const { authorized } = await authHandler(context.req, context.res);
  if (authorized) {
    const id = context.params.id;
    const productData = await fetch(`${server}/api/product/crud?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const catsData = await fetch(`${server}/api/product/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const product = await productData.json();
    const allCategories = await catsData.json();

    return { props: { id, product, allCategories } };
  } else {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
}
