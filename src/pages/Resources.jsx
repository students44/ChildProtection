import React, { useState } from 'react';
import { MapPin, Phone, Globe, Search } from 'lucide-react';

const Resources = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    const resources = [
        {
            name: "Sahil NGO",
            type: "NGO",
            address: "Islamabad, Pakistan",
            phone: "051-1234567",
            website: "https://sahil.org",
            description: "Working against child sexual abuse and providing legal aid."
        },
        {
            name: "Child Protection Bureau",
            type: "Government",
            address: "Lahore, Punjab",
            phone: "1121",
            website: "https://cpb.punjab.gov.pk",
            description: "Government body for the protection and rehabilitation of destitute and neglected children."
        },
        {
            name: "Edhi Foundation",
            type: "NGO",
            address: "Nationwide",
            phone: "115",
            website: "https://edhi.org",
            description: "Provides ambulance services, orphanages, and shelter homes."
        },
        {
            name: "PIMS Hospital",
            type: "Hospital",
            address: "G-8, Islamabad",
            phone: "051-9261170",
            website: "http://pims.gov.pk",
            description: "Emergency medical services and child protection unit."
        },
        {
            name: "Kashf Foundation",
            type: "NGO",
            address: "Lahore, Pakistan",
            phone: "042-111-981-981",
            website: "https://kashf.org",
            description: "Focuses on women and child empowerment and financial literacy."
        }
    ];

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || resource.type === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Resources & Help Centers</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Find registered NGOs, government bureaus, and hospitals near you.
                </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or city..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'NGO', 'Government', 'Hospital'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === type
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
                <div className="z-10 text-center p-4">
                    <MapPin size={48} className="mx-auto text-gray-500 mb-2" />
                    <p className="text-gray-600 font-medium">Interactive Map Loading...</p>
                    <p className="text-sm text-gray-500">(Google Maps API integration would go here)</p>
                </div>
            </div>

            {/* Directory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-800">{resource.name}</h3>
                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">{resource.type}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                        <div className="space-y-2 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span>{resource.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>{resource.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe size={16} />
                                <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Visit Website</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
