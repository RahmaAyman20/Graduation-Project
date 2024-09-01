import React, { useContext, useEffect, useState } from 'react';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ProductAcard = ({ token }) => {
    const [data, setData] = useState(null);
    const [ratingBeforeFakeFilter, setRatingBeforeFakeFilter] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useContext(ProductContext);
    const api_url = `http://127.0.0.1:8000/api/reviews-analysis?product_id=${id}`;
    const api_url1 = `http://127.0.0.1:8000/api/product/${id}`;
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get(api_url1, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRatingBeforeFakeFilter(response1.data.data.product.average_rating);

                const response2 = await axios.get(api_url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response2.data.data);
            } catch (error) {
                setError(error);
                console.error('There was an error fetching the data:', error);
            }
        };
        fetchData();
    }, [token, id, api_url, api_url1]);

    if (error) {
        return <p>There was an error fetching the data: {error.message}</p>;
    }

    if (!data || !ratingBeforeFakeFilter) {
        return <p>Loading...</p>;
    }
    const pieData = {
        labels: ['Positivity', 'Negativity'],
        datasets: [
            {
                data: [data.positivity_average, data.negativity_average],
                backgroundColor: ['#ff9999', '#66b3ff'],
                hoverBackgroundColor: ['#ff6666', '#3399ff']
            }
        ]
    };
    const barOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 5
            }
        }
    };

    const doughnutData = {
        labels: ['Fake', 'Real'],
        datasets: [
            {
                data: [data.fake_percentage, 1 - data.fake_percentage],
                backgroundColor: ['#ff9999', '#66b3ff'],
                hoverBackgroundColor: ['#ff6666', '#3399ff']
            }
        ]
    };

    const summaryData = {
        labels: ['Rating After Filter', 'Rating Before Filter'],
        datasets: [
            {
                labels: ['After', 'Before'],
                data: [data.rating_after_fake_filter, ratingBeforeFakeFilter],
                backgroundColor: ['#66b3ff', '#ff9999'],
                borderColor: ['#3399ff', '#ff6666'],
                borderWidth: 1
            }
        ]
    };

    return (
        <>
            <div style={{width:"350px",backgroundColor:"white",border:"1px solid gray",borderRadius:"20px",padding:"10px 5px"}}>
            <h5>Positivity VS Negativity</h5>
            <Pie data={pieData} />
            <ul style={{color:'gray'}}>
            <li>{Math.round(data.positivity_average*100)}% of the reviews for the product are positive</li>
            <li>{data.negativity_average*100}% of the reviews for the product are negative</li>
            </ul>
            </div>
            <div style={{width:"350px",backgroundColor:"white",border:"1px solid gray",borderRadius:"20px",padding:"10px 5px"}}>
            <h5>Fake Percentage</h5>
            <Doughnut data={doughnutData} />
            <ul style={{color:'gray'}}>
            <li>{Math.round(data.fake_percentage*100)}% of the reviews for the product are Fake</li>
            <li>{Math.round((1-data.fake_percentage)*100)}% of the reviews for the product are Real</li>
            </ul>
            </div >
            <div style={{width:"380px",height:"fit-content",backgroundColor:"white",border:"1px solid gray",borderRadius:"20px",padding:"15px 20px"}}>
            <h5>Rating After and Before Filter</h5>
            <Bar data={summaryData} options={barOptions} />
            <ul style={{color:'gray'}}>
            <li>{ratingBeforeFakeFilter} : Rating Before Filter Fake Reviews</li>
            <li>{data.rating_after_fake_filter} : Rating After Filter Fake Reviews</li>
            </ul>

            </div>
        </>
    );
};

export default ProductAcard;
