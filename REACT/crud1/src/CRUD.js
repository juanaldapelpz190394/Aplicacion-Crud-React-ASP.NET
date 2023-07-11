import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios, { Axios } from "axios";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const CRUD = () =>{
    
    
    const empdata = [
        {
            id: 1,
            name: 'juan',
            age: 29, 
            isActive : 1

        },
        {
            id: 2,
            name: 'jose',
            age: 28, 
            isActive : 1

        },
        {
            id: 3,
            name: 'pedro',
            age: 35, 
            isActive : 0

        }
    ]
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const[name, setName] = useState('')
    const[age, setAge] = useState('')
    const[isActive, setIsActive] = useState(0) 

    const[editID, setEditId] = useState('')
    const[editName, setEditName] = useState('')
    const[editAge, setEditAge] = useState('')
    const[editIsActive, setEditIsActive] = useState(0) 



    const [data, setData] = useState([]);

    useEffect(()=>{
        getData();
    },[])


    const getData = () =>{
        axios.get('http://localhost:5001/api/Employee')
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleEdit =(id) =>{
       // alert(id);
        handleShow();
        axios.get(`http://localhost:5001/api/Employee/${id}`)
        .then((result) =>{
            setEditName(result.data.name);
            setEditAge(result.data.age);
            setEditIsActive(result.data.isActive);
            setEditId(id);
        })
        .catch((error) =>{
            console.log(error)
        })


    }

    const handleDelete =(id) =>{
        if(window.confirm("Estas seguro que quieres borrar este empleado") == true)
        {
            
            
            axios.delete(`http://localhost:5001/api/Employee/${id}`)
            .then((result)=>{
                if(result.status === 200)
                {
                    toast.success('Se elimino correctamente');
                    getData();
                }
            })
            .catch((error)=>{
                toast.error(error);
            })
        }


    }
    const handleUpdate =() =>{
        const url = `http://localhost:5001/api/Employee/${editID}`;
        const data ={
            
            "id": editID,
            "name": editName,
            "age": editAge,
            "isActive": editIsActive
        }

        axios.put(url, data)
        .then((result) =>{
            handleClose();
            getData();
            clear();

            toast.success('Se actualizo correctamente');
        }).catch((error)=>{
            toast.error(error);
        })

    
    }

    const handleSave =() =>{
        const url = 'http://localhost:5001/api/Employee'
        if (name === '' || age === '') {
            toast.error('rellena todos los campos');
        }else {
        
        const data ={
            "name": name,
            "age": age,
            "isActive": isActive
        }

        axios.post(url, data)
        .then((result) =>{
            getData();
            clear();
            toast.success('Se agrego correctamente');
        }).catch((error)=>{
            toast.error(error);
        })
    }

    
    }

    const clear = () =>{
        setName('');
        setAge('');
        setIsActive(0);
        setEditName('');
        setEditAge('');
        setEditIsActive(0);
        setEditId('');
    }
    const handleActiveChange=(e) =>{
        if(e.target.checked){
            setIsActive(1);
        }
        else{
            setIsActive(0);
        }

    }

    const handleEditActiveChange=(e) =>{
        if(e.target.checked){
            setEditIsActive(1);
        }
        else{
            setEditIsActive(0);
        }

    }


     
    return(
        <Fragment>
            <ToastContainer/>
        <Container>
                <Row>
                    <Col>
                    <input type="text" className="form-control" placeholder="Ingresa el nombre"
                    value={name} onChange={(e)=> setName(e.target.value)}
                    />                    
                    </Col>
                    <Col>
                    <input type="text" className="form-control" placeholder="Ingresa la edad"
                    value={age} onChange={(e)=> setAge(e.target.value)}
                    />    
                    </Col>
                    <Col>
                    <input type="checkbox"
                    checked={isActive === 1 ? true : false}
                    onChange={(e) => handleActiveChange(e)} value={isActive}
                    />
                    <label>isActive</label>
                    </Col>
                    <Col>
                    <button className="btn btn-primary" onClick={()=> handleSave()}>Submit</button>
                 
                 
                    </Col>


                </Row>

         </Container>

            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
          
                    <th>Name</th>
                    <th>Age</th>
                    <th>isActive</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    data && data.length > 0 ?
                    data.map((item, index) =>{
                        return(
                            <tr key={index}>
                             <td>{index+ 1}</td>
                   
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.isActive}</td>
                            <td colSpan={2}>
                            <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}>Edit</button> &nbsp;
                            <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete</button>
                            </td>
        
                        </tr>
                        )

                    })
                    :
                    'loading...'
                }
            
            </tbody>
            </Table>

                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modificar/Actualizar empleado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                    <Col>
                    <input type="text" className="form-control" placeholder="Ingresa el nombre"
                    value={editName} onChange={(e)=> setEditName(e.target.value)}
                    />                    
                    </Col>
                    <Col>
                    <input type="text" className="form-control" placeholder="Ingresa la edad"
                    value={editAge} onChange={(e)=> setEditAge(e.target.value)}
                    />    
                    </Col>
                    <Col>
                    <input type="checkbox"
                    checked={editIsActive === 1 ? true : false}
                    onChange={(e) => handleEditActiveChange(e)} value={editIsActive}
                    />
                    <label>isActive</label>
                    </Col>
           
                </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>



        </Fragment>
    )

}
 

export default CRUD; 