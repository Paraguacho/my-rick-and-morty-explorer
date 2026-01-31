import React, { useState, useEffect, use } from "react";
import { Row, Col, Card, Tag, Input, Typography, Spin, Pagination, Modal} from "antd";

import CharacterCard from "./CharacterCard";


const {Meta} = Card;
const {Title} = Typography;

function App() {
    //Estado de los personajes
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [modalLoading,setModalLoading] = useState(false)

    const statusColors = {
        Alive: 'green',
        Dead: 'red',
        unknown : 'default'
    }

    //Mostrar detalles
    const handleViewDetail = async (id) =>{
        setIsModalOpen(true)
        setModalLoading(true)
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const data = await response.json()
            setSelectedCharacter(data)
        } catch (error) {
            console.log("Error al obtener info del personaje", error)
        }finally{
            setModalLoading(false)
        }
    }

    const fetchCharacters = async(page = 1,name = '') => {
        setLoading(true)
        try {
            const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`
            const response = await fetch(url)
            const data = await response.json()

            // Mostrar mensaje si no hay resultaods
            if(response.ok && data.results){
                setCharacters(data.results);
                setTotal(data.info.count);
            }else{
                setCharacters([]);
                setTotal(0)
            }
        } catch (error) {
            console.log("Error mostrando personajes: " , error)
            setCharacters([])
            setTotal(0)
        } finally{
            setLoading(false)
        };
    };
    
    useEffect(()=>{
        //Debounce para la busqueda tardia
        const delayDebounce = setTimeout(() => {
            fetchCharacters(1,searchName);
            //Página nueva 
            setCurrentPage(1)
        }, 500);
        return() => clearTimeout (delayDebounce)
    }, [searchName]);

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
            padding: '20px 40px',
            width: '95vw',
            minHeight: '100vh',
            backgroundColor: '#141414'
            }}> 

            <Title level={1} style={{
                textAlign: 'center',
                color:'#efefef',
                backgroundColor:'#343534',
                marginTop: '20px', 
                letterSpacing: '4px',
                borderRadius: '15px',
                padding :'4px'
               
            }}>
                Rick And Morty Explorer
            </Title> 
            
            <div style={{
                display:'flex',
                justifyContent: 'center',
                marginBottom: '40px'
                }}>
                <Input
                    placeholder="Buscar..."
                    allowClear
                    style={{maxWidth:'500px'}}
                    onChange={(est)=>{ setSearchName(est.target.value)}}   
                />
            </div> 
            
            <Row gutter={[16,16]}>
                    {characters.length>0 ? (
                    characters.map((character)=>(
                        <Col key={character.id} style={{flex: '1 0 18%', maxWidth:'20%'}} xs={24} sm={12} md={8} lg ={6} xl = {6}>
                            <CharacterCard
                                character = {character}
                                onViewDetail = {handleViewDetail}
                            />
                        </Col>
                    ))
                    ):(
                        !loading && (
                            <Col span={24} style={{textAlign:'center', marginTop:'50px'}}>
                                <Title level={3} style={{color:'#efefef'}}>
                                    No se encontraron personajes con el nombre "{searchName}"
                                </Title>
                            </Col>
                        )
                    )}
            </Row>
            <div style={{
                display:'flex',
                justifyContent: 'center',
                textAlign: 'center',
                marginTop: '30px', 
                width: '100%'
                }}>
                <Pagination 
                    current={currentPage} 
                    total={total} 
                    pageSize={20} 
                    onChange={(page) => {
                        setCurrentPage(page);
                        fetchCharacters(page, searchName);
                    }}
                    showSizeChanger={false}
                />
            </div>
            <Modal 
                title = {<b>Detalle del Personaje</b>}
                open= {isModalOpen}
                onCancel={()=>{setIsModalOpen(false)}}
                footer= {null}
                destroyOnHidden
                centered
                width={600}
            >
                {modalLoading ? (
                    <div style={{
                            textAlign:'center',
                            padding:'50px',
                            }}        
                    >
                    <Spin size='Large'/> 
                    </div>) : selectedCharacter && (
                        <div style={{
                            display: 'flex',
                            gap: '20px',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                            }}>
                            <img 
                                src={selectedCharacter.image}
                                alt={selectedCharacter.name}
                                style={{
                                    width:'250px',
                                    borderRadius:'10px',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{flex:1,minWidth:'250px'}}>
                                <Title level={1}><b>{selectedCharacter.name}</b></Title>
                                <p><b>Especie: </b>{selectedCharacter.species}</p>
                                <p><b>Género: </b><i>{selectedCharacter.gender}</i></p>
                                <p><b>Origen: </b>{selectedCharacter.origin?.name}</p>
                                <p><b>Estatus:</b>
                                    <Tag color={statusColors[selectedCharacter.status] || 'default' }>
                                        {selectedCharacter.status}
                                    </Tag>
                                </p>
                                <p><b>Creado: </b>{new Date(selectedCharacter.created).toLocaleDateString('es-ES',{
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric' 
                                    })}
                                </p>
                            </div>
                        </div>
                    )}
            </Modal>
        </div> 
    );
}

export default App;