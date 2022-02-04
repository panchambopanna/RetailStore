import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../common/Loading';
import agent from '../../api/axios';
import PageNotFound from '../common/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {

    const { id } = useParams();
    const [productDet, setProductDet] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // axios.get(`http://localhost:5000/api/Products/${id}`)
        //     .then(res => setProductDet(res.data))
        //     .catch(e => console.log(e))
        //     .finally(setLoading(false))

        agent.catalog.details(parseInt(id))
        .then(product=>setProductDet(product))
        .catch(e=>console.log(e))
        .finally(setLoading(false))

    }, [id]);

    if (loading) return (<Loading />)
    
    if (productDet === '') return (<PageNotFound/>)

    return (
        <div className='container d-flex justify-content-evenly my-3'>
            <ToastContainer position='bottom-right' theme='dark' autoClose={2000} type='error' hideProgressBar />
            <div>
                <img src={productDet.pictureUrl} alt={productDet.name} style={{width:"30vw", height:"60vh"}} />
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th colSpan={2} scope="col"><h1>{productDet.name}</h1></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2}><h1>₹{productDet.price}/-</h1></td>
                    </tr>
                    <tr>
                        <td>Brand</td>
                        <td>{productDet.brand}</td>
                    </tr>
                    <tr>
                        <td>Desciption</td>
                        <td>{productDet.description}</td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>{productDet.type}</td>
                    </tr>
                    <tr>
                        <td>Quantity in Stock</td>
                        <td>{productDet.quantityInStock}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ProductDetail;
