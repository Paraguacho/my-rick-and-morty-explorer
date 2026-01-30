import { Tag } from 'antd';

export const getColumns = (onView) =>[
    {
        title: 'Foto',
        dataIndex: 'image',
        key: 'image',
        render : (image) => <img src ={image} alt='avat2ar' style={{width: 50, borderRadius: '50%'}}/>
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
        key : 'name',
        render : (text) =><b>{text}</b>
    },
    {
        title: 'Genero',
        dataIndex: 'gender',
        key: 'gender',
        render: (text) =><i>{text}</i>
    },
    {
        title: 'Estado',
        dataIndex: 'status',
        key: 'status',
        render: (status)=>(
            <Tag color={status == 'Alive' ? 'green' : status == 'Dead' ? 'red' : 'default'}>
                {status}
            </Tag>
        ),
    },
    {
        title: 'Fecha de creacion',
        dataIndex: 'created',
        key: 'created',
        //Conversion de la fecha a formato DD-MM-YYYY
        render: (date) => new Date(date).toDateString('es-ES')
    },
    {
        title: 'Detalles',
        key: 'show',
        render : (_,record) => (
            <button onClick={()=> onViewDetail(record.id)}>Ver detalle</button>
        ),
    },
]