import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { physiotherapistId } = useParams()
    const { physiotherapists, currencySymbol, backendUrl, token, getPhysiotherapistsData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [physiotherapistInfo, setPhysiotherapistInfo] = useState(false)
    const [physioSlots, setPhysioSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [reviewsVisible, setReviewsVisible] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [appointmentDetails, setAppointmentDetails] = useState({
        date: '',
        time: '',
        formattedDate: ''
    })

    const navigate = useNavigate()

    const fetchPhysioInfo = async () => {
        const physiotherapistInfo = physiotherapists.find((phyisiotherapist) => phyisiotherapist._id === physiotherapistId)
        setPhysiotherapistInfo(physiotherapistInfo)
    }

    // Function to calculate average rating
    const calculateAverageRating = () => {
        if (!physiotherapistInfo || !physiotherapistInfo.reviews || physiotherapistInfo.reviews.length === 0) {
            return 0;
        }
        
        const totalRating = physiotherapistInfo.reviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / physiotherapistInfo.reviews.length).toFixed(1);
    }

    // Function to render stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<span key={i} className="text-yellow-400">★</span>);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<span key={i} className="text-yellow-400">★</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300">★</span>);
            }
        }
        
        return stars;
    }

    // Format date for reviews
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    const getAvailableSolts = async () => {

        setPhysioSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = physiotherapistInfo.slots_booked[slotDate] && physiotherapistInfo.slots_booked[slotDate].includes(slotTime) ? false : true
                
                // Check if the time slot is in the future
                const isInFuture = currentDate > new Date();

                if (isSlotAvailable && isInFuture) {
                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }
                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setPhysioSlots(prev => ([...prev, timeSlots]))

        }

    }

    // Function to prepare appointment confirmation
    const prepareAppointmentConfirmation = () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            toast.warning('Please select a time slot')
            return
        }

        const date = physioSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        
        // Format date for display in modal
        const formattedDate = `${day} ${months[month-1]} ${year}`
        
        setAppointmentDetails({
            date: slotDate,
            time: slotTime,
            formattedDate: formattedDate
        })
        
        setShowConfirmModal(true)
    }

    const bookAppointment = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/book-appointment', 
                { 
                    physiotherapistId, 
                    slotDate: appointmentDetails.date, 
                    slotTime: appointmentDetails.time 
                }, 
                { headers: { token } }
            )
            
            if (data.success) {
                toast.success(data.message)
                getPhysiotherapistsData()
                setShowConfirmModal(false)
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Array of month names for formatting
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    useEffect(() => {
        if (physiotherapists.length > 0) {
            fetchPhysioInfo()
        }
    }, [physiotherapists, physiotherapistId])

    useEffect(() => {
        if (physiotherapistInfo) {
            getAvailableSolts()
        }
    }, [physiotherapistInfo])

    return physiotherapistInfo ? (
        <div>

            {/* ---------- Physiotherapist Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={physiotherapistInfo.image} alt="" />
                </div>

                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

                    {/* ----- Physiotherapist Info : name, degree, experience ----- */}

                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{physiotherapistInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{physiotherapistInfo.degree} - {physiotherapistInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{physiotherapistInfo.experience}</button>
                    </div>

                    {/* ----- Physiotherapist Rating ----- */}
                    {physiotherapistInfo.reviews && physiotherapistInfo.reviews.length > 0 && (
                        <div className="flex items-center mt-2">
                            <div className="flex items-center">
                                {renderStars(calculateAverageRating())}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                                {calculateAverageRating()} ({physiotherapistInfo.reviews.length} {physiotherapistInfo.reviews.length === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>
                    )}

                    {/* ----- Physiotherapist About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{physiotherapistInfo.about}</p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{physiotherapistInfo.fees} {currencySymbol}</span> </p>
                </div>
            </div>

            
            {/* Booking slots */}
            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p >Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {physioSlots.length && physioSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {physioSlots.length && physioSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>{item.time.toLowerCase()}</p>
                    ))}
                </div>

                <button onClick={prepareAppointmentConfirmation} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an appointment</button>
            </div>

            {/* Reviews Section */}
            {physiotherapistInfo.reviews && physiotherapistInfo.reviews.length > 0 && (
                <div className="mt-8 sm:ml-72 sm:pl-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-700">Patient Reviews</h3>
                        <button 
                            onClick={() => setReviewsVisible(!reviewsVisible)} 
                            className="text-primary text-sm"
                        >
                            {reviewsVisible ? 'Hide Reviews' : 'Show Reviews'}
                        </button>
                    </div>
                    
                    {reviewsVisible && (
                        <div className="mt-4 space-y-4">
                            {physiotherapistInfo.reviews.map((review, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {renderStars(review.rating)}
                                            <span className="ml-2 font-medium">{review.rating}/5</span>
                                        </div>
                                        {review.date && (
                                            <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                                        )}
                                    </div>
                                    {review.comment && (
                                        <p className="mt-2 text-gray-600">{review.comment}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Confirm Appointment</h2>
                        
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-2">Appointment Details:</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="mb-2"><span className="font-medium">Physiotherapist:</span> {physiotherapistInfo.name}</p>
                                <p className="mb-2"><span className="font-medium">Date:</span> {appointmentDetails.formattedDate}</p>
                                <p className="mb-2"><span className="font-medium">Time:</span> {appointmentDetails.time}</p>
                                <p><span className="font-medium">Fee:</span> {physiotherapistInfo.fees} {currencySymbol}</p>
                            </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">Are you sure you want to book this appointment?</p>
                        
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={bookAppointment}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    ) : null
}

export default Appointment