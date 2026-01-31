import React from 'react';
import { Modal, Typography, Tag, Spin } from 'antd';
const {Title} = Typography

const CharacterModal = ({ isOpen, onClose, character, loading, statusColors }) => {
    return(
        <Modal 
                title = {<b>Detalle del Personaje</b>}
                open= {isOpen}
                onCancel={onClose}
                footer= {null}
                destroyOnHidden
                centered
                width={600}
            >
                {loading ? (
                    <div style={{
                            textAlign:'center',
                            padding:'50px',
                            }}        
                    >
                    <Spin size='Large'/> 
                    </div>) : character && (
                        <div style={{
                            display: 'flex',
                            gap: '20px',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                            }}>
                            <img 
                                src={character.image}
                                alt={character.name}
                                style={{
                                    width:'250px',
                                    borderRadius:'10px',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{flex:1,minWidth:'250px'}}>
                                <Title level={1}><b>{character.name}</b></Title>
                                <p><b>Especie: </b>{character.species}</p>
                                <p><b>Género: </b><i>{character.gender}</i></p>
                                <p><b>Origen: </b>{character.origin?.name}</p>
                                <p><b>Estatus: </b>
                                    <Tag color={statusColors[character.status] || 'default' }>
                                        {character.status}
                                    </Tag>
                                </p>
                                <p><b>Creado: </b>{new Date(character.created).toLocaleDateString('es-ES',{
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric' 
                                    })}
                                </p>
                            </div>
                        </div>
                    )}
            </Modal>
    );
};

export default CharacterModal;