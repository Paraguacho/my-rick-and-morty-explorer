import React, { useState, useEffect } from "react";
import { Row, Col, Card, Tag, Input, Typography, Pagination} from "antd";

import CharacterCard from "./CharacterCard";


const {Meta} = Card;
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
       <div style={{
            padding: '40px',
            maxWidth: '1200px',
            margin: '0 auto'
            }}> 
            <Title level={2} style={{
                textAlign: 'center',
                marginBottom: '30px', 
                background: 'white',
                borderRadius: '15px',
                padding : '4px'
               
            }}>
                Rick And Morty Explorer
            </Title>  
            <Row gutter={[16,16]}>
                    {characters.map((character)=>(
                        <Col key={character.id} xs={24} sm={12} md={8} lg ={6} xl = {5}>
                            <CharacterCard
                                character = {character}
                                onViewDetail = {handleViewDetail}
                            />
                        </Col>
                    ))}
            </Row>
            <div style={{
                textAlign: 'center',
                marginTop: '30px' 
            }}>
            <Pagination 
                current={currentPage} 
                total={total} 
                pageSize={20} 
                onChange={(page) => {
                setCurrentPage(page);
                fetchCharacters(page);
                }}
                showSizeChanger={false}
            />
            </div>
        </div> 
    );
}

export default App;