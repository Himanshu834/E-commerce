import React, { useState } from 'react'
import Layout from '../../components/Layout/layout';
import { Button, Col, Container, Jumbotron, Modal, Row,Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import input from '../../components/input/input'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.actions';
import './style.css';
import { generatePublicUrl } from '../../urlconfig';

function Products() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [productDetails,setProductDetails]=useState(null);
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPicture, setProductPicture] = useState('');
    const category=useSelector(state=>state.category);
    const product=useSelector(state=> state.product);
    const [productDetailModal,setProductDetailModal]=useState(false);

    const dispatch = useDispatch();

    const showProductDetailsModal=(product)=>{
        setProductDetails(product);
        setProductDetailModal(true);
    }

    const handlecloseProductdetailsModal=()=>{
        setProductDetailModal(false);
    }
    const renderShowProductDetailModal=()=>{
        if(!productDetails)
            return null;
        return (
            <Modal show={productDetailModal} onHide={handlecloseProductdetailsModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="6">
                            <label className="key">Name</label>
                            <p className="value">{productDetails.name} </p>
                        </Col>
                        <Col md="6">
                            <label className="key">Price</label>
                            <p className="value">{productDetails.price} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <label className="key">Quantity</label>
                            <p className="value">{productDetails.quantity} </p>
                        </Col>
                        <Col md="6">
                            <label className="key">Category</label>
                            <p className="value">{productDetails.category.name}</p>
                        </Col>
                    </Row>
                    <Row >
                        <Col md="12">
                            <label className="key">Description</label>
                            <p className="value">{productDetails.description}</p>
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                        <label className="key">Product Pictures</label>
                        <div style={{display:'flex'}}>
                            {productDetails.productPictures.map(picture=>
                            <div className="productImgContainer">
                                <img src={generatePublicUrl(picture.img)}></img>
                            </div>
                            )}
                        </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handlecloseProductdetailsModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    const handleClose = () => {
        const form=new FormData();
        form.append('name',name);
        form.append('quantity',quantity);
        form.append('price',price);
        form.append('description',description);
        form.append('category',categoryId);
        for(let pic of productPicture){
            form.append('productPicture',pic);
        }
        dispatch(addProduct(form));

        setShow(false);
    }
    const handleProductPictures=(e)=>{
        setProductPicture([
            ...productPicture,
            e.target.files[0]
        ]);
    }
    const RenderProducts=()=>{
        return (<Table style={{fontSize:12}} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qunatity</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
            {
                product.products.length>0?
                product.products.map(product=>
                    <tr onClick={()=>showProductDetailsModal(product)} key={product._id}>
                        <td>3</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        
                        <td>{product.category.name}</td>
                    </tr>
                    ):null
            }
          
        </tbody>
      </Table>);
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }
    const handleShow = () => setShow(true);
    return (
        <>
            <Layout sidebar>
            <Container>
                <Row style={{paddingTop:'70px'}}>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <RenderProducts/>
                    </Col>
                </Row>
            </Container>
            </Layout>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className="form-control"
                        label="Name"
                        value={name}
                        placeholder={`Product Name`}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input className="form-control"
                        label="Quantity"
                        value={quantity}
                        placeholder={`Quantity`}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <input className="form-control"
                        label="Price"
                        value={price}
                        placeholder={`Price`}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input className="form-control"
                        label="Description"
                        value={description}
                        placeholder={`Description`}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select className="form-control" onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
                        <option>Select category</option>{
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        }
                    </select>
                    {
                        productPicture.length>0?
                        productPicture.map((pic,index)=><div key={index}>{pic.name}</div>):null
                    }
                    <input className="form-control" type="file" name="productPicture" onChange={handleProductPictures}/>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {renderShowProductDetailModal()}
        </>
    );
}

export default Products;
