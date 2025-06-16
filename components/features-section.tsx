import {Calendar, Clock, MapPin, Shield, Star, Users} from "lucide-react"

const features = [
    {
        icon: Clock,
        title: "No Waiting Time",
        description: "Book appointments and skip the long hospital queues",
    },
    {
        icon: Shield,
        title: "Verified Doctors",
        description: "All doctors are verified and certified professionals",
    },
    {
        icon: Calendar,
        title: "Easy Scheduling",
        description: "Choose your preferred time slot and book instantly",
    },
    {
        icon: Users,
        title: "Patient Reviews",
        description: "Read genuine reviews from verified patients",
    },
    {
        icon: Star,
        title: "Quality Care",
        description: "Get the best medical care from top-rated doctors",
    },
    {
        icon: MapPin,
        title: "Find Nearby",
        description: "Locate doctors and clinics near your location",
    },
]

export function FeaturesSection() {
    return (
        <section className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Caredo?</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We&#39;re revolutionizing healthcare by making quality medical care accessible, convenient, and transparent for
                        everyone.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                                <feature.icon className="h-6 w-6 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}