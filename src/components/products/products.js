import React from "react";
import axios from "axios";

const ProductsPage=()=>{

    React.useEffect(()=>{
        const result = axios.get("http://localhost:8080/api/products/categories")
        result.then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
    return(
        <>
            <h1>Welcome to the products page</h1>
        </>
    )
}

export default ProductsPage