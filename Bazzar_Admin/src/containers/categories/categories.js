import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, deleteCategories, getAllCategory, updateCategories } from '../../actions/categories.action';
import Layout from '../../components/Layout/layout'
import input from '../../components/input/input'
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosCloudUpload,
    IoIosB

} from 'react-icons/io'
import {RiDeleteBin6Line} from "react-icons/ri";
import './style.css'

import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

function Categories() {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [expanded, setExpanded] = useState([]);
    const [checked, setChecked] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    useEffect(() => {
        console.log(category);
        if(!category.loading){
            setShow(false);
        }
    }, [category])
    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        setShow(false);
    }
    const updateCategoriesForm = () => {
        const form = new FormData();
        console.log({ expandedArray, checkedArray });
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });

        dispatch(updateCategories(form));
        setUpdateCategoryModal(false);
    }
    const handleShow = () => setShow(true);
    const renderCategories = (categories) => {
        let mycategories = [];
        for (let category of categories) {
            mycategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        }
        return mycategories;
    }
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId, type: category.type });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }
    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            // console.log(updatedCheckedArray);
            setCheckedArray(updatedCheckedArray);
        }
        else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }
    const updateCategory = () => {
        updateCheckedandExpandedCategories();
        setUpdateCategoryModal(true);
    }
    const updateCheckedandExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const renderCategoriesForm = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className="form-control"
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <select className="form-control" onChange={(e) => setParentCategoryId(e.target.value)} value={parentCategoryId}>
                        <option>Select category</option>{
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        }
                    </select>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} className="form-control" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    const updateCategoriesForms = () => {
        return (
            <Modal show={updateCategoryModal} onHide={()=>{setUpdateCategoryModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title size='lg'>Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h6>Expanded Categories</h6>
                        </Col>
                    </Row>
                    {
                        expandedArray.length > 0 &&
                        expandedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <input className="form-control"
                                        value={item.name}
                                        placeholder={`Category Name`}
                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                    />
                                </Col>
                                <Col>
                                    <select className="form-control" onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')} value={item.parentId}>
                                        <option>Select category</option>{
                                            createCategoryList(category.categories).map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>
                                            )
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select className="form-control"
                                        value={item.type}
                                        onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Store">Store</option>
                                        <option value="Product">Product</option>
                                        <option value="Page">Page</option>

                                    </select>
                                </Col>
                            </Row>
                        )
                    }
                    <Row>
                        <Col>
                            <h6>Checked Categories </h6>
                        </Col>
                    </Row>
                    {
                        checkedArray.length > 0 &&
                        checkedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <input className="form-control"
                                        value={item.name}
                                        placeholder={`Category Name`}
                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                    />
                                </Col>
                                <Col>
                                    <select className="form-control" onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')} value={item.parentId}>
                                        <option>Select category</option>{
                                            createCategoryList(category.categories).map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>
                                            )
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select className="form-control"
                                        value={item.type}
                                        onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Store">Store</option>
                                        <option value="Product">Product</option>
                                        <option value="Page">Page</option>

                                    </select>
                                </Col>
                            </Row>
                        )
                    }


                    {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} className="form-control" /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={updateCategoriesForm}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const deleteCategoriesModal = () => {
        return (
            <Modal show={deleteCategoryModal} onHide={() => { setDeleteCategoryModal(false) }}>
                <Modal.Header className="form-control" closeButton>
                    Confirm
                 </Modal.Header>
                <Modal.Body >
                    <h5>Expanded</h5>
                    {
                        expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
                    }
                    <h5>Checked</h5>{
                        checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
                    }
                </Modal.Body>
                <Modal.Footer >
                    <Button variant="primary" onClick={() => alert("No")}>
                        No
                    </Button>
                    <Button variant="danger" onClick={deleteCategoryForm}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    const deleteCategory = () => {
        updateCheckedandExpandedCategories();
        setDeleteCategoryModal(true);
    }
    const deleteCategoryForm = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategories(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory());
                    }
                })
        }

        setDeleteCategoryModal(false);

    }

    return (
        <div>
            <Layout sidebar>
                <Container className="category">
                    <Row style={{ paddingTop: '70px' }}>
                        <Col md={12}>
                            <Row>
                                <Col>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h3>Category</h3>
                                    </div>
                                </Col>
                                <Col >
                                    Actions :  
                                    <button className="button" onClick={handleShow}><IoIosAdd/> Add</button>
                                    <button className="button" onClick={deleteCategory} ><RiDeleteBin6Line/> Delete</button>
                                    <button className="button" onClick={updateCategory} ><IoIosCloudUpload/> Edit</button>

                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>

                            {/* <ul>
                                {renderCategories(category.categories)}
                            </ul> */}
                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />
                                }}
                            />
                        </Col>
                    </Row>

                </Container>
            </Layout>
            {deleteCategoriesModal()}
            {updateCategoriesForms()}
            {renderCategoriesForm()}

        </div>
    )
}

export default Categories;