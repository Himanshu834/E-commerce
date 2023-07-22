import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout/layout'
import { input } from '../../components/input/input'
import linearCategories from '../../helpers/linearCategories';
import { useSelector ,useDispatch} from 'react-redux';
import { createPage } from '../../actions';
function Page() {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc]=useState('');
    const [banner ,setBanner]=useState('');
    const [products, setProducts]=useState('');
    const [type , setType] = useState('');
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);

    const handleBannerImages=(e)=>{
        console.log(e);
        setBanner([...banner , e.target.files[0]]);
    }
    const handleProductImages=(e)=>{
        console.log(e);
        setProducts([...products,e.target.files[0]]);
    }

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);
    useEffect(() => {
        if(!page.loading){
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setDesc('');
            setProducts([]);
            setBanner([]);
        }
    }, [page])

    const onCategoryChange =(e)=>{
        const category=categories.find(category => category.value == e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
        console.log(category.type);
    }

    const submitPageForm = (e) =>{
        const user=JSON.parse(localStorage.getItem('user'));
        const form = new FormData();
        form.append('title',title);
        form.append('description',desc);
        form.append('category',categoryId);
        form.append('type',type);
        // form.append('createdBy',user._id);

        banner.map((banners,index)=>{
            form.append('banners',banners);
        });
        products.map((product,index)=>{
            form.append('products',product);
        });
        dispatch(createPage(form));
        console.log(user._id);
    }
    const renderCategoryModal = () => {
        return (
            <Modal show={createModal} onHide={()=>setCreateModal(false)}>
                <Modal.Header className="form-control" closeButton>
                    Create New Page
                 </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col>
                            <input
                                className="form-control form-control-sm"
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                                placeholder={'Page Title'}
                            ></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <select
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option>Select Category</option>
                                {
                                    categories.map(cat=>
                                        <option key={cat.value} value={cat.value}>{cat.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                                <input
                                    value={desc}
                                    onChange={(e)=>setDesc(e.target.value)}
                                    placeholder={'Page Description'}
                                    className="form-control form-control-sm"
                                />
                        </Col>
                    </Row>
                    <Row>{
                            banner.length > 0 ?
                            banner.map((banners,index)=>
                                <Row key={index}> 
                                    <Col>{banners.name}</Col>
                                </Row>
                            ):null
                        }
                        <Col>
                                <input
                                    type="file"
                                    name="banners"
                                    onChange={handleBannerImages}
                                    className="form-control form-control-sm"
                                />
                        </Col>
                    </Row>
                    <Row>
                    {
                            products.length > 0 ?
                            products.map((product,index)=>
                                <Row key={index}> 
                                    <Col>{product.name}</Col>
                                </Row>
                            ):null
                        }
                        <Col>
                                <input
                                    type="file"
                                    name="products"
                                    onChange={handleProductImages}
                                    className="form-control form-control-sm"
                                />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer >
                    <Button variant="primary" onClick={submitPageForm}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        );

    }

    return (
        <Layout >
            <div style={{ marginTop: '70px' }}></div>
            {
                page.loading ? 
                <p>Page is being created.... Please wait
                </p> :
                <>
                    {renderCategoryModal()}
            <Button onClick={() => { setCreateModal(true) }}>Create Page</Button>
                </>
            }
        </Layout>
    )
}

export default Page
