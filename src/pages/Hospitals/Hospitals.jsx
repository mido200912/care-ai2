import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaPhone, FaHospital, FaArrowLeft, FaFilter } from 'react-icons/fa';
import './Hospitals.css';

// Mock Data for Hospitals (since GET API is not available yet)
const MOCK_HOSPITALS = [
    {
        id: 1,
        name: "CareAi General Hospital",
        address: "123 Health St, Cairo",
        city: "Cairo",
        phone: "+20 123 456 789",
        specialties: ["Cardiology", "Emergency", "Pediatrics"],
        rating: 4.8,
        distance: "2.5 km"
    },
    {
        id: 2,
        name: "Al-Amal Medical Center",
        address: "45 Nile Corniche, Giza",
        city: "Giza",
        phone: "+20 100 987 654",
        specialties: ["Orthopedics", "Surgery", "Neurology"],
        rating: 4.5,
        distance: "5.1 km"
    },
    {
        id: 3,
        name: "Future Care Clinic",
        address: "88 Tahrir Square, Cairo",
        city: "Cairo",
        phone: "+20 111 222 333",
        specialties: ["Dermatology", "Dental", "General"],
        rating: 4.2,
        distance: "1.2 km"
    },
    {
        id: 4,
        name: "Alexandria Royal Hospital",
        address: "10 Sea View Rd, Alexandria",
        city: "Alexandria",
        phone: "+20 122 333 444",
        specialties: ["Cardiology", "Oncology", "Emergency"],
        rating: 4.9,
        distance: "120 km"
    },
    {
        id: 5,
        name: "Sheikh Zayed Specialized Hospital",
        address: "Sheikh Zayed City, Giza",
        city: "Giza",
        phone: "+20 100 555 666",
        specialties: ["Surgery", "Internal Medicine", "ICU"],
        rating: 4.7,
        distance: "15 km"
    }
];

const Hospitals = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('All');
    const [hospitals, setHospitals] = useState(MOCK_HOSPITALS);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        filterHospitals(term, selectedCity);
    };

    const handleCityFilter = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        filterHospitals(searchTerm, city);
    };

    const filterHospitals = (term, city) => {
        let filtered = MOCK_HOSPITALS.filter(hospital =>
            hospital.name.toLowerCase().includes(term) ||
            hospital.specialties.some(s => s.toLowerCase().includes(term))
        );

        if (city !== 'All') {
            filtered = filtered.filter(h => h.city === city);
        }

        setHospitals(filtered);
    };

    return (
        <div className="hospitals-page">
            <div className="container">
                <div className="page-header">
                    <button onClick={() => navigate('/dashboard')} className="back-link">
                        <FaArrowLeft /> Back to Dashboard
                    </button>
                    <h1 className="gradient-text">Find Hospitals</h1>
                    <p>Locate the nearest medical centers and partners</p>
                </div>

                <div className="search-filters glass-card">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name or specialty..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className="filter-box">
                        <FaFilter className="filter-icon" />
                        <select value={selectedCity} onChange={handleCityFilter}>
                            <option value="All">All Cities</option>
                            <option value="Cairo">Cairo</option>
                            <option value="Giza">Giza</option>
                            <option value="Alexandria">Alexandria</option>
                        </select>
                    </div>
                </div>

                <div className="hospitals-grid">
                    {hospitals.length > 0 ? (
                        hospitals.map(hospital => (
                            <div key={hospital.id} className="hospital-card glass-card">
                                <div className="card-image">
                                    <FaHospital />
                                </div>
                                <div className="card-content">
                                    <div className="card-header-row">
                                        <h3>{hospital.name}</h3>
                                        <span className="rating-badge">⭐ {hospital.rating}</span>
                                    </div>

                                    <div className="card-info">
                                        <p><FaMapMarkerAlt /> {hospital.address}</p>
                                        <p><FaPhone /> {hospital.phone}</p>
                                    </div>

                                    <div className="specialties-tags">
                                        {hospital.specialties.map((spec, i) => (
                                            <span key={i} className="tag">{spec}</span>
                                        ))}
                                    </div>

                                    <div className="card-actions">
                                        <button className="btn btn-secondary btn-sm">View Details</button>
                                        <button className="btn btn-primary btn-sm">Book Appointment</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <FaHospital className="no-result-icon" />
                            <h3>No hospitals found</h3>
                            <p>Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hospitals;
