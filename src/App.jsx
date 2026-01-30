import React, { useState, useEffect } from "react";
import { Table, Typography } from "antd";
import { getColumns } from "./columns";

const {Title} = Typography;

function App() {
    //Estado de los personajes
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    //Mostrar detalles
    const handleViewDetail = (id) =>{
        console.log(`Personaje id: ${id}`)
    }

    const fetchCharacters = async(page = 1) => {
        setLoading(true)
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            const data = await response.json()

            //Guarda characters y el total para la pagina 
            setCharacters(data.results);
            setTotal(data.info.count);
        } catch (error) {
            console.log("Error mostrando personajes: " , error)
        } finally{
            setLoading(false)
        };
    };
    
    useEffect(()=>{
        fetchCharacters();
    }, []);

    //Tabla para limpiar JSX
    const tablePagination = {
        current: currentPage,
        total: total,
        pageSize: 20,
        onChange: (page)=>{
            setCurrentPage(page)
            fetchCharacters(page)
        }
    };

    return(
        <div style={
                {
                    padding:'40px',
                    maxWidth : '1200px',
                    margin: '0 auto'
                }
            }>
            <Title level={2} style={
            {
                textAlign: 'center',
                marginBottom: '30px'
            }
            }
            >Rick and Morty Explorer</Title>
            <Table
                columns={getColumns(handleViewDetail)}
                dataSource={characters}
                loading={loading}
                rowKey="id"
                pagination={tablePagination}
            />
        </div>
    );
}

export default App;