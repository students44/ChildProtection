import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Upload, MapPin, User, FileText, CheckCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const ReportAbuse = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [files, setFiles] = useState([]);

    const onSubmit = (data) => {
        console.log(data);
        console.log(files);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            reset();
            setFiles([]);
        }, 1500);
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                >
                    <CheckCircle size={48} />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800">Report Submitted Securely</h2>
                <p className="text-gray-600 max-w-md">
                    Thank you for your courage. Your report has been encrypted and sent to our child protection team. We will take immediate action.
                </p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Submit Another Report
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <ScrollReveal className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Shield className="text-primary" /> Report Abuse
                </h1>
                <p className="text-gray-600">
                    Your safety is our priority. You can report anonymously. All data is end-to-end encrypted.
                </p>
            </ScrollReveal>

            <ScrollReveal className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">
                <div className="flex items-center justify-between mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${isAnonymous ? 'bg-primary' : 'bg-gray-300'}`} onClick={() => setIsAnonymous(!isAnonymous)}>
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isAnonymous ? 'translate-x-4' : ''}`}></div>
                        </div>
                        <span className="font-medium text-gray-700">Report Anonymously</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                        {isAnonymous ? 'Identity Hidden' : 'Identity Visible'}
                    </span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Child Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Child Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Child's Name (Optional)</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        {...register("childName")}
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Leave blank if unknown"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Age</label>
                                <input
                                    {...register("childAge")}
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g. 10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location / Address *</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    {...register("location", { required: "Location is required" })}
                                    type="text"
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="City, Area, or specific address"
                                />
                            </div>
                            {errors.location && <span className="text-red-500 text-xs mt-1">{errors.location.message}</span>}
                        </div>
                    </div>

                    {/* Abuse Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Incident Details</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type of Abuse *</label>
                            <select
                                {...register("abuseType", { required: "Please select a type" })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="">Select Type</option>
                                <option value="physical">Physical Abuse</option>
                                <option value="sexual">Sexual Abuse</option>
                                <option value="emotional">Emotional Abuse</option>
                                <option value="neglect">Neglect</option>
                                <option value="cyberbullying">Cyberbullying</option>
                                <option value="trafficking">Trafficking</option>
                                <option value="labor">Child Labor</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.abuseType && <span className="text-red-500 text-xs mt-1">{errors.abuseType.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                            <textarea
                                {...register("description", { required: "Please provide details" })}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Please describe what happened..."
                            ></textarea>
                            {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
                        </div>
                    </div>

                    {/* Evidence */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Evidence (Optional)</h3>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                            <p className="text-sm text-gray-600">Click or drag to upload images, videos, or documents</p>
                            <p className="text-xs text-gray-400 mt-1">Max size: 10MB per file</p>
                        </div>
                        {files.length > 0 && (
                            <div className="text-sm text-gray-600">
                                {files.length} file(s) selected
                            </div>
                        )}
                    </div>

                    {/* Reporter Details (if not anonymous) */}
                    {!isAnonymous && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Your Contact Info</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input
                                        {...register("reporterName")}
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone/Email</label>
                                    <input
                                        {...register("reporterContact")}
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg flex items-center justify-center gap-2"
                        >
                            <AlertTriangle size={20} />
                            Submit Report
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-4">
                            By submitting, you agree to our terms. False reporting is a punishable offense.
                        </p>
                    </div>
                </form>
            </ScrollReveal>
        </div>
    );
};

export default ReportAbuse;
