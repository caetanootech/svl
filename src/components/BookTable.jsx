import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";

function BookTable() {

    let [posts, setPosts] = useState([])

    const columns = [
        {
            dataField: 'id',
            text: 'Id'
        }, {
            dataField: 'title',
            text: 'Título'
        }, {
            dataField: 'body',
            text: 'texto'
        }
    ]

    const getPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                //console.log('posts', data)
                setPosts(data)
            })
    }

    useEffect(() => {
        getPosts()

    }, []);

    // const columns = [{
    //     dataField: 'id',
    //     text: 'Product ID'
    // }, {
    //     dataField: 'name',
    //     text: 'Product Name'
    // }, {
    //     dataField: 'price',
    //     text: 'Product Price'
    // }];

    // const products = [{
    //     id: '1',
    //     name: 'livro 1',
    //     price: '40,00'
    // }, {
    //     id: '2',
    //     name: 'livro 2',
    //     price: '50,00'
    // }, {
    //     id: '3',
    //     name: 'livro 3',
    //     price: '70,00'
    // }]

    return (
        <div>
            <BootstrapTable keyField='id' data={posts} columns={columns} />
        </div>
    )
}

export default BookTable

