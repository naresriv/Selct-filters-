import React, { useEffect, useState } from 'react'
import { Select } from "antd"


const FilterSelect = () => {
    const { Option } = Select;

    const [categorys, setCategory] = useState([]);
    const [products, setProducts] = useState([])

    //to get the categoryes of products
    const GetCategory = () => {
        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategory(data))
    }

    //to get the products
    const GetProducts = (url) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setProducts(data))
    }

    console.log(categorys, products);
    useEffect(() => {
        GetCategory();
        GetProducts("https://fakestoreapi.com/products")
    }, [])

    const selectCategory = (e) => {
        // GetProducts(`https://fakestoreapi.com/products/category/${e.target.value}`)
        // or
        if (e.target.value === 'All') {
            GetProducts("https://fakestoreapi.com/products")
        }
        else {
            GetProducts(`https://fakestoreapi.com/products/category/${e.target.value}`)
            // to get data when select the filter
        }
    }
    return (
        <div>
            <div>
                <h2>Filter Select data</h2>
                <div>
                    <select onChange={selectCategory} placeholder="select" defaultValue="helo">
                        <option>All</option>
                        {categorys.map(item =>
                            <option key={item}>{item}</option>
                        )}
                    </select>
                </div>
                <div className='cards_data'>
                    {products.map((product) => (
                        <div className='card'>
                            <h4>{product.category}</h4>
                            <img src={product.image} />
                            <h5>{product.price}</h5>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FilterSelect
