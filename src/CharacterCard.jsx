import React from 'react';
import { Card, Tag, Button } from 'antd';
const {Meta}  = Card;

const CharacterCard = ({character, onViewDetail}) =>{
    //Fecha con formato
    if(!character) return null
    const formatedDate = character?.created
        ? new Date(character.created).toLocaleDateString('es-ES',{
           day: '2-digit',
           month: '2-digit',
           year: 'numeric' 
    }): 'Error fecha'
    
    

    const statusColors = {
        Alive: 'green',
        Dead: 'red',
        unknown : 'deafult'
    }

    return(
        <Card
            hoverable
            style={{
                width: '100',
                marginBottom: '16px'
            }}
            cover={<img 
                        alt={character.name}
                         src={character.image} 
            />}
            actions={[
                <button type='link' onClick={()=> onViewDetail(character.id)}>
                    Ver Detalle
                </button>
            ]}
            
        >
            <Meta
                title={<b>{character.name}</b>}
                description={
                    <>
                        <p style={{margin: 0}}> <i>{character.gender}</i></p>
                        <Tag color={statusColors[character.status]}>
                            {character.status}
                        </Tag>
                        <p style={{
                                    marginTop: '8px',
                                    fontSize: '12px',
                                    color :'gray'
                                }}
                            >{formatedDate}
                        </p> 
                    </>
                }
            />
        </Card>
    );
};

export default CharacterCard