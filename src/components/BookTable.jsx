import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";



function BookTable() {

    let [comments, setComments] = useState([])
// 1 - Criar o state que vai conter a lista da api

// 2 - Criar o objeto colunas, no qual o dataField é a propriedade do objeto
    const columns = [
        {
            dataField: 'id',
            text: 'ID'
        }, {
            dataField: 'name',
            text: 'Nome'
        }, {
            dataField: 'email',
            text: 'E-mail'
        }, {
            dataField: 'body',
            text: 'Texto'
        }
    ]

    const getPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(data => {
                //console.log('posts', data)
                setComments(data)
            })
    }

    useEffect(() => {
        getPosts()

    }, []);

    return (
        <div>
            <BootstrapTable keyField='id' data={comments} columns={columns} pagination={paginationFactory() } />
        </div>
    )
}

export default BookTable

