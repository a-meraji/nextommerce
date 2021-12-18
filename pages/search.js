export default function search() {
    return (
        <div>
            <button onClick={async()=>{
                const res = await fetch("/api/product/crud", {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  const data = await res.json();
                  console.log(data)
            }}>bott</button>
        </div>
    )
}
